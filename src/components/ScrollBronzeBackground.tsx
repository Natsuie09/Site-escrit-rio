import React, { useEffect, useRef } from 'react';

interface CharTitleProps {
  lines: string[];
  className?: string;
}

export const LaocoonTitle: React.FC<CharTitleProps> = ({ lines, className = '' }) => {
  let delayCounter = 0;
  return (
    <h2 className={`laocoon-title ${className}`}>
      {lines.map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <br />}
          {Array.from(line).map((ch, charIdx) => {
            if (ch === ' ') {
              return <React.Fragment key={charIdx}> </React.Fragment>;
            }
            const delay = (delayCounter++ * 0.035).toFixed(3);
            return (
              <span
                key={charIdx}
                className="char"
                style={{ transitionDelay: `${delay}s` }}
              >
                {ch}
              </span>
            );
          })}
        </React.Fragment>
      ))}
    </h2>
  );
};

export const ScrollBronzeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorInnerRef = useRef<HTMLDivElement | null>(null);
  const cursorOuterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let animationFrameId = 0;
    let cleanupResize: (() => void) | null = null;
    let cleanupMouse: (() => void) | null = null;

    const baseUrl = import.meta.env.BASE_URL || './';
    const scaleImgUrl = `${baseUrl}images/balanca-bronze-fundo.jpg`;
    const farmerImgUrl = `${baseUrl}images/agricultor-campo-fundo.jpg`;

    const initWebGL = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        const importModule = new Function('specifier', 'return import(specifier)') as (
          specifier: string
        ) => Promise<any>;

        const THREE = await importModule('three');
        const { RoomEnvironment } = await importModule(
          'three/examples/jsm/environments/RoomEnvironment.js'
        );

        if (disposed) return;

        const sizes = { width: window.innerWidth, height: window.innerHeight };
        const clock = new THREE.Clock();

        let currentScroll = 0;
        let mouseX = 0,
          mouseY = 0,
          targetMouseX = 0,
          targetMouseY = 0;
        let cursorX = window.innerWidth / 2,
          cursorY = window.innerHeight / 2;
        let outerCursorX = window.innerWidth / 2,
          outerCursorY = window.innerHeight / 2;

        const scaleRig: {
          beam: any;
          hangers: any[];
          pivotY: number;
          armLength: number;
          hookDrop: number;
        } = {
          beam: null,
          hangers: [],
          pivotY: 2.38,
          armLength: 1.1,
          hookDrop: 0.05
        };

        const shaderUniforms = {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uScroll: { value: 0 },
          uFarm: { value: 0 },
          uScaleTex: { value: null as any },
          uScaleReady: { value: 0 },
          uScaleAspect: { value: 1024 / 640 },
          uFarmTex: { value: null as any },
          uFarmReady: { value: 0 },
          uFarmAspect: { value: 626 / 470 }
        };

        const sparkCount = 450;
        const sparkData: Array<{
          speedX: number;
          speedY: number;
          speedZ: number;
          swaySpeed: number;
          swayRadius: number;
          phase: number;
        }> = [];
        let sparkParticles: any = null;
        let modelPivot: any = null;

        const smooth = (a: number, b: number, v: number) => {
          const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
          return t * t * (3 - 2 * t);
        };

        // 1. Scene & Camera
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#000000');
        scene.fog = new THREE.FogExp2('#000000', 0.01);

        const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(0, 0.2, 3.0);
        scene.add(camera);

        // 2. Background Liquid-Bronze Wave Shader (Balança -> Agricultor)
        const vertexShader = `
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

        const fragmentShader = `
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec2 uMouse;
          uniform float uScroll;
          uniform float uFarm;
          uniform sampler2D uScaleTex;
          uniform float uScaleReady;
          uniform float uScaleAspect;
          uniform sampler2D uFarmTex;
          uniform float uFarmReady;
          uniform float uFarmAspect;

          float hash(float n) { return fract(sin(n) * 43758.5453123); }
          float noise(in vec3 x) {
              vec3 p = floor(x);
              vec3 f = fract(x);
              f = f*f*(3.0-2.0*f);
              float n = p.x + p.y*57.0 + 113.0*p.z;
              return mix(mix(mix(hash(n+  0.0), hash(n+  1.0), f.x),
                             mix(hash(n+ 57.0), hash(n+ 58.0), f.x), f.y),
                         mix(mix(hash(n+113.0), hash(n+114.0), f.x),
                             mix(hash(n+170.0), hash(n+171.0), f.x), f.y), f.z);
          }

          vec2 coverUv(vec2 screenUv, float screenAspect, float imgAspect, float zoom, vec2 offset) {
              vec2 cuv = screenUv - 0.5;
              if (screenAspect > imgAspect) {
                  cuv.y *= imgAspect / screenAspect;
              } else {
                  cuv.x *= screenAspect / imgAspect;
              }
              vec2 uvOut = cuv / zoom + 0.5 + offset;
              return clamp(uvOut, 0.002, 0.998);
          }

          void main() {
              vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
              vec2 su = gl_FragCoord.xy / uResolution.xy;
              float aspect = uResolution.x / uResolution.y;

              float time = uTime * 0.08;
              float scroll = uScroll;

              // --- 1. Constant Wave Parameters ---
              float angle1 = 0.6;
              float angle2 = -0.7;
              float angle3 = 1.2;

              float freq1 = 2.4;
              float freq2 = 3.2;
              float freq3 = 4.0;

              // --- 2. Coordinates Distortion ---
              vec2 warpedUv = uv;
              float scrollDeform = scroll * 5.0;

              warpedUv.x += sin(uv.y * 2.5 + time * 0.2 + scrollDeform) * 0.35;
              warpedUv.y += cos(uv.x * 2.5 - time * 0.15 - scrollDeform * 0.8) * 0.35;

              warpedUv.x += sin(uv.y * 1.2 - time * 0.1 - scrollDeform * 1.5) * 0.25;
              warpedUv.y += cos(uv.x * 1.2 + time * 0.18 + scrollDeform * 1.2) * 0.25;

              vec2 scrollDrift = vec2(scroll * 0.04, -scroll * 0.02);
              vec2 mouseShift = vec2(uMouse.x * aspect * 0.05, uMouse.y * 0.05);
              warpedUv += scrollDrift + mouseShift;

              // --- 3. Layered Wave Computations ---
              vec2 dir1 = vec2(cos(angle1), sin(angle1));
              vec2 dir2 = vec2(cos(angle2), sin(angle2));
              vec2 dir3 = vec2(cos(angle3), sin(angle3));

              float w1 = sin(dot(warpedUv, dir1) * freq1 + time * 1.0);
              float w2 = cos(dot(warpedUv, dir2) * freq2 - time * 1.4 + w1 * 0.4);
              float w3 = sin(dot(warpedUv, dir3) * freq3 + time * 1.8 + w2 * 0.5);

              float waveField = w1 * 0.50 + w2 * 0.35 + w3 * 0.15;

              // --- 4. Crisp Metallic Lustre ---
              float wideSheen = pow(max(0.0, 1.0 - abs(waveField - 0.1)), 2.5);
              float crispSpecular = pow(max(0.0, 1.0 - abs(waveField - 0.15)), 8.0);
              float crest = wideSheen * 0.5 + crispSpecular * 0.9;

              // --- 5. Scroll-Driven Color Palettes ---
              vec3 c0_shadow = vec3(0.0010, 0.0006, 0.0004);
              vec3 c0_wave1  = vec3(0.085, 0.040, 0.015);
              vec3 c0_wave2  = vec3(0.050, 0.022, 0.008);
              vec3 c0_crest  = vec3(0.45, 0.30, 0.18);

              vec3 c1_shadow = vec3(0.0004, 0.0006, 0.0012);
              vec3 c1_wave1  = vec3(0.015, 0.035, 0.065);
              vec3 c1_wave2  = vec3(0.008, 0.020, 0.045);
              vec3 c1_crest  = vec3(0.28, 0.36, 0.24);

              float t = smoothstep(0.0, 1.0, scroll);
              vec3 colShadow = mix(c0_shadow, c1_shadow, t);
              vec3 colWave1  = mix(c0_wave1, c1_wave1, t);
              vec3 colWave2  = mix(c0_wave2, c1_wave2, t);
              vec3 colCrest  = mix(c0_crest, c1_crest, t);

              // --- 6. Base Liquid Bronze Wave Color ---
              vec3 waveColor = colShadow;
              waveColor = mix(waveColor, colWave2, smoothstep(-0.6, 0.2, waveField));
              waveColor = mix(waveColor, colWave1, smoothstep(0.0, 0.8, waveField));
              waveColor += colCrest * crest * 1.4;

              // --- 7. Stage 1 (Topo -> Meio): Balança ao Fundo + Ondas de Bronze ---
              vec3 color = waveColor;
              if (uScaleReady > 0.5) {
                  float scaleZoom = mix(1.06, 1.20, smoothstep(0.0, 0.55, scroll));
                  vec2 scaleOffset = vec2(uMouse.x * 0.012, uMouse.y * 0.010 - scroll * 0.05) + warpedUv * 0.010;
                  vec2 suv = coverUv(su, aspect, uScaleAspect, scaleZoom, scaleOffset);
                  vec3 scaleImg = texture2D(uScaleTex, suv).rgb;
                  float sLum = dot(scaleImg, vec3(0.299, 0.587, 0.114));
                  scaleImg = mix(vec3(sLum), scaleImg, 0.88) * vec3(1.08, 0.94, 0.78);
                  // Funde a imagem da balança com as ondas de bronze líquido
                  color = mix(waveColor, scaleImg * 0.62 + waveColor * 0.68, 0.68);
              }

              // --- 8. Stage 2 (Rolagem Meio -> Fim): Agricultor ao Fundo ---
              if (uFarm > 0.001 && uFarmReady > 0.5) {
                  float farmZoom = mix(1.24, 1.06, smoothstep(0.32, 1.0, scroll));
                  vec2 farmOffset = vec2(-0.04 + uMouse.x * 0.012, -0.03 + uMouse.y * 0.010 + (scroll - 0.65) * 0.06);
                  vec2 fuv = coverUv(su, aspect, uFarmAspect, farmZoom, farmOffset);
                  vec3 farmImg = texture2D(uFarmTex, fuv).rgb;
                  float fLum = dot(farmImg, vec3(0.299, 0.587, 0.114));
                  farmImg = mix(vec3(fLum), farmImg, 0.90) * vec3(1.06, 0.97, 0.85);
                  farmImg *= 0.78;

                  // Transição orgânica pelas cristas das ondas de bronze líquido
                  float n = waveField * 0.5 + 0.5;
                  float reveal = smoothstep(n - 0.14, n + 0.14, uFarm * 1.28 - 0.14);
                  float edge = reveal * (1.0 - reveal) * 4.0;

                  vec3 farmComposite = farmImg + waveColor * 0.32 + colCrest * crest * 0.25;
                  color = mix(color, farmComposite, reveal);
                  color += c0_crest * edge * 1.15;
              }

              // Vignette cinematográfica
              float vignette = 1.0 - dot(uv, uv) * 0.14;
              color *= vignette;

              gl_FragColor = vec4(color, 1.0);
          }
        `;

        const bgMaterial = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: shaderUniforms,
          depthWrite: false,
          depthTest: false
        });

        const bgGeometry = new THREE.PlaneGeometry(30, 30);
        const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
        bgMesh.position.set(0.0, 0.0, -8.0);
        bgMesh.renderOrder = -10;
        camera.add(bgMesh);

        // Carrega as texturas da Balança e do Agricultor
        const texLoader = new THREE.TextureLoader();
        texLoader.load(scaleImgUrl, (tex: any) => {
          tex.minFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          shaderUniforms.uScaleTex.value = tex;
          shaderUniforms.uScaleReady.value = 1.0;
        });
        texLoader.load(farmerImgUrl, (tex: any) => {
          tex.minFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          shaderUniforms.uFarmTex.value = tex;
          shaderUniforms.uFarmReady.value = 1.0;
        });

        // 3. Renderer
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 2.2;

        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

        // 4. Chiaroscuro Lighting (verbatim do prompt)
        const ambientLight = new THREE.AmbientLight('#ffffff', 0.1);
        scene.add(ambientLight);

        const keyLight = new THREE.SpotLight('#ffffff', 18.0);
        keyLight.position.set(4, 6, 3);
        keyLight.angle = Math.PI / 4;
        keyLight.penumbra = 0.9;
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.near = 1.0;
        keyLight.shadow.camera.far = 15;
        keyLight.shadow.bias = -0.001;
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight('#e3f2ff', 10.0);
        rimLight.position.set(-5, 3, -4);
        scene.add(rimLight);

        const fillLight = new THREE.DirectionalLight('#fff3e6', 0.8);
        fillLight.position.set(-2, -4, 2);
        scene.add(fillLight);

        // 5. Forge Sparks (450 additive particles)
        const createSparkTexture = () => {
          const c = document.createElement('canvas');
          c.width = 16;
          c.height = 16;
          const ctx = c.getContext('2d')!;
          const g = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
          g.addColorStop(0, 'rgba(255, 255, 255, 1)');
          g.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
          g.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, 16, 16);
          return new THREE.CanvasTexture(c);
        };

        const createSparks = () => {
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array(sparkCount * 3);
          const colors = new Float32Array(sparkCount * 3);

          for (let i = 0; i < sparkCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 6.5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 5.0 - 0.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6.5;

            if (Math.random() < 0.6) {
              colors[i * 3] = 1.0;
              colors[i * 3 + 1] = 0.4 + Math.random() * 0.15;
              colors[i * 3 + 2] = 0.05 + Math.random() * 0.1;
            } else {
              colors[i * 3] = 0.55 + Math.random() * 0.15;
              colors[i * 3 + 1] = 0.82 + Math.random() * 0.12;
              colors[i * 3 + 2] = 1.0;
            }

            sparkData.push({
              speedX: (Math.random() - 0.5) * 0.4,
              speedY: 0.15 + Math.random() * 0.3,
              speedZ: (Math.random() - 0.5) * 0.4,
              swaySpeed: 0.5 + Math.random() * 1.5,
              swayRadius: 0.05 + Math.random() * 0.15,
              phase: Math.random() * Math.PI * 2
            });
          }

          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

          const material = new THREE.PointsMaterial({
            size: 0.025,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            map: createSparkTexture()
          });

          sparkParticles = new THREE.Points(geometry, material);
          scene.add(sparkParticles);
        };

        // 6. 3D Bronze Scale of Justice (Balança de Bronze 3D)
        const updateScaleRig = (tilt: number, swing: number) => {
          if (!scaleRig.beam) return;
          scaleRig.beam.rotation.z = tilt;
          const c = Math.cos(tilt);
          const s = Math.sin(tilt);
          scaleRig.hangers.forEach((h, i) => {
            const lx = scaleRig.armLength * h.userData.side;
            const ly = -scaleRig.hookDrop;
            h.position.set(c * lx - s * ly, scaleRig.pivotY + s * lx + c * ly, 0);
            h.rotation.z = swing * (i === 0 ? 1 : -0.8);
            h.rotation.x = swing * 0.4;
          });
        };

        const buildScaleOfJustice = () => {
          const root = new THREE.Group();
          const bronze = new THREE.MeshStandardMaterial({
            color: '#a2703f',
            roughness: 0.42,
            metalness: 0.92,
            envMapIntensity: 0.28
          });
          const bronzeDeep = bronze.clone();
          bronzeDeep.color.set('#7a5230');
          const panMat = bronze.clone();
          panMat.side = THREE.DoubleSide;

          const V2 = (r: number, y: number) => new THREE.Vector2(r, y);
          const lathe = (pts: number[][], seg = 72) =>
            new THREE.LatheGeometry(pts.map(([r, y]) => V2(r, y)), seg);
          const add = (geo: any, mat = bronze, parent: any = root) => {
            const m = new THREE.Mesh(geo, mat);
            parent.add(m);
            return m;
          };
          const ringAt = (
            radius: number,
            tube: number,
            y: number,
            parent: any = root,
            mat = bronze
          ) => {
            const m = add(new THREE.TorusGeometry(radius, tube, 12, 96), mat, parent);
            m.rotation.x = Math.PI / 2;
            m.position.y = y;
            return m;
          };

          // Base ornamentada
          add(
            lathe(
              [
                [0, 0],
                [0.62, 0],
                [0.645, 0.025],
                [0.63, 0.055],
                [0.57, 0.075],
                [0.56, 0.11],
                [0.5, 0.13],
                [0.47, 0.17],
                [0.44, 0.2],
                [0.37, 0.235],
                [0.29, 0.29],
                [0.21, 0.37],
                [0.15, 0.47],
                [0.115, 0.56],
                [0.135, 0.6],
                [0.135, 0.63],
                [0.095, 0.655],
                [0.07, 0.69],
                [0.06, 0.72],
                [0, 0.72]
              ],
              96
            ),
            bronzeDeep
          );
          ringAt(0.615, 0.022, 0.05);
          ringAt(0.47, 0.016, 0.165);
          ringAt(0.14, 0.02, 0.615);

          const beadGeo = new THREE.SphereGeometry(0.022, 12, 10);
          const beads = new THREE.InstancedMesh(beadGeo, bronze, 40);
          const m4 = new THREE.Matrix4();
          for (let i = 0; i < 40; i++) {
            const a = (i / 40) * Math.PI * 2;
            m4.makeTranslation(Math.cos(a) * 0.555, 0.105, Math.sin(a) * 0.555);
            beads.setMatrixAt(i, m4);
          }
          root.add(beads);

          // Coluna central
          const col = add(new THREE.CylinderGeometry(0.042, 0.048, 1.5, 32));
          col.position.y = 1.47;
          add(
            lathe([
              [0.05, 0.72],
              [0.09, 0.76],
              [0.115, 0.82],
              [0.095, 0.9],
              [0.06, 0.95],
              [0.078, 0.985],
              [0.05, 1.03]
            ]),
            bronzeDeep
          );
          ringAt(0.055, 0.015, 1.28);
          const knob = add(new THREE.SphereGeometry(0.07, 32, 20));
          knob.position.y = 1.9;
          knob.scale.y = 0.8;
          add(
            lathe([
              [0.045, 2.12],
              [0.08, 2.18],
              [0.1, 2.24],
              [0.08, 2.3],
              [0.05, 2.34]
            ]),
            bronzeDeep
          );

          // Travessão e braços
          const beam = new THREE.Group();
          beam.position.y = scaleRig.pivotY;
          root.add(beam);

          const hub = add(new THREE.SphereGeometry(0.085, 32, 20), bronze, beam);
          hub.scale.set(1, 0.9, 0.8);
          add(
            lathe([
              [0.05, 0.04],
              [0.088, 0.09],
              [0.07, 0.17],
              [0.03, 0.22],
              [0.062, 0.28],
              [0.045, 0.34],
              [0.0, 0.48]
            ]),
            bronzeDeep,
            beam
          );
          const crown = add(new THREE.TorusGeometry(0.06, 0.012, 8, 32), bronze, beam);
          crown.position.y = 0.28;
          crown.rotation.y = Math.PI / 2;

          const makeArm = () => {
            const g = new THREE.Group();
            const curve = new THREE.CatmullRomCurve3([
              new THREE.Vector3(0.0, 0.02, 0),
              new THREE.Vector3(0.25, 0.075, 0),
              new THREE.Vector3(0.6, 0.115, 0),
              new THREE.Vector3(0.95, 0.12, 0),
              new THREE.Vector3(1.1, 0.075, 0),
              new THREE.Vector3(1.115, 0.02, 0)
            ]);
            add(new THREE.TubeGeometry(curve, 80, 0.026, 14, false), bronze, g);
            const tipCap = add(new THREE.SphereGeometry(0.03, 16, 12), bronze, g);
            tipCap.position.set(1.115, 0.02, 0);
            const hook = add(new THREE.TorusGeometry(0.035, 0.011, 8, 24), bronze, g);
            hook.position.set(scaleRig.armLength, -0.015, 0);

            const s1 = add(
              new THREE.TorusGeometry(0.085, 0.013, 8, 48, Math.PI * 1.5),
              bronzeDeep,
              g
            );
            s1.position.set(0.19, -0.02, 0);
            s1.rotation.z = Math.PI * 0.25;
            const s2 = add(
              new THREE.TorusGeometry(0.05, 0.011, 8, 40, Math.PI * 1.5),
              bronzeDeep,
              g
            );
            s2.position.set(0.4, 0.055, 0);
            s2.rotation.z = Math.PI * 1.25;
            const leaf = add(new THREE.ConeGeometry(0.022, 0.09, 12), bronzeDeep, g);
            leaf.position.set(0.3, 0.13, 0);
            leaf.rotation.z = -0.5;
            return g;
          };

          beam.add(makeArm());
          const armL = makeArm();
          armL.scale.x = -1;
          beam.add(armL);
          scaleRig.beam = beam;

          // Pratos e correntes
          const panDrop = 1.2;
          const rimR = 0.37;
          const linkGeo = new THREE.TorusGeometry(0.018, 0.0052, 6, 14);
          const up = new THREE.Vector3(0, 1, 0);

          [1, -1].forEach((side, idx) => {
            const hanger = new THREE.Group();
            root.add(hanger);

            const top = new THREE.Vector3(0, 0, 0);
            const ends = [0, 1, 2].map((k) => {
              const a = Math.PI / 2 + k * ((Math.PI * 2) / 3) + idx * 0.4;
              return new THREE.Vector3(Math.cos(a) * rimR, -panDrop + 0.02, Math.sin(a) * rimR);
            });
            const spacing = 0.04;
            const counts = ends.map((e) => Math.floor(e.distanceTo(top) / spacing));
            const chain = new THREE.InstancedMesh(
              linkGeo,
              bronze,
              counts.reduce((a, b) => a + b, 0)
            );
            let n = 0;
            const q = new THREE.Quaternion();
            const qTwist = new THREE.Quaternion();
            const pos = new THREE.Vector3();
            const scl = new THREE.Vector3(1, 1.55, 1);

            ends.forEach((end, cIdx) => {
              const dir = end.clone().sub(top).normalize();
              q.setFromUnitVectors(up, dir);
              for (let i = 0; i < counts[cIdx]; i++) {
                pos.copy(top).addScaledVector(dir, (i + 0.5) * spacing);
                qTwist.setFromAxisAngle(up, ((i % 2) * Math.PI) / 2);
                const qq = q.clone().multiply(qTwist);
                m4.compose(pos, qq, scl);
                chain.setMatrixAt(n++, m4);
              }
            });
            hanger.add(chain);

            const topRing = add(new THREE.TorusGeometry(0.022, 0.007, 8, 20), bronze, hanger);
            topRing.rotation.x = Math.PI / 2;

            const pan = new THREE.Group();
            pan.position.y = -panDrop;
            hanger.add(pan);
            add(
              lathe(
                [
                  [0, -0.075],
                  [0.12, -0.072],
                  [0.24, -0.06],
                  [0.32, -0.04],
                  [0.37, -0.015],
                  [0.395, 0.005],
                  [0.405, 0.02]
                ],
                96
              ),
              panMat,
              pan
            );
            ringAt(0.403, 0.012, 0.02, pan);
            ringAt(0.11, 0.012, -0.075, pan, bronzeDeep);

            hanger.userData.side = side;
            scaleRig.hangers.push(hanger);
          });

          updateScaleRig(0, 0);
          return root;
        };

        const mountModel = (object: any) => {
          modelPivot = new THREE.Group();
          scene.add(modelPivot);
          modelPivot.add(object);

          object.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                child.material.roughness = 0.42;
                child.material.metalness = 0.92;
                child.material.flatShading = false;
              }
            }
          });

          const boxInitial = new THREE.Box3().setFromObject(object);
          const sizeInitial = boxInitial.getSize(new THREE.Vector3());
          const maxDim = Math.max(sizeInitial.x, sizeInitial.y, sizeInitial.z);
          const targetScale = 2.65 / (maxDim > 0.0001 ? maxDim : 1);
          object.scale.setScalar(targetScale);
          object.updateMatrixWorld(true);

          const boxScaled = new THREE.Box3().setFromObject(object);
          const centerScaled = boxScaled.getCenter(new THREE.Vector3());
          object.position.sub(centerScaled);

          modelPivot.position.y = -0.4;
        };

        createSparks();
        mountModel(buildScaleOfJustice());

        // 7. Resize & Mouse listeners
        const onWindowResize = () => {
          sizes.width = window.innerWidth;
          sizes.height = window.innerHeight;
          camera.aspect = sizes.width / sizes.height;
          camera.updateProjectionMatrix();
          renderer.setSize(sizes.width, sizes.height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          shaderUniforms.uResolution.value.set(sizes.width, sizes.height);
        };

        const onMouseMove = (event: MouseEvent) => {
          cursorX = event.clientX;
          cursorY = event.clientY;
          if (cursorInnerRef.current) {
            cursorInnerRef.current.style.left = `${cursorX}px`;
            cursorInnerRef.current.style.top = `${cursorY}px`;
          }
          targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
          targetMouseY = (event.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mousemove', onMouseMove);
        cleanupResize = () => window.removeEventListener('resize', onWindowResize);
        cleanupMouse = () => window.removeEventListener('mousemove', onMouseMove);

        // 8. UI helpers: grid dots, story progress & cinematic windows
        const updateGridDots = (scroll: number) => {
          const dots = document.querySelectorAll<HTMLElement>('.grid-dot');
          dots.forEach((dot, i) => {
            const startY = ((i * 17) % 80) + 10;
            let speed = 90 + ((i * 55) % 180);
            if (i % 2 === 0) speed = -speed;
            let y = startY + scroll * speed;
            y = ((y % 100) + 100) % 100;
            dot.style.top = `${y}%`;
          });
        };

        const updateStoryProgressAndWindows = (scroll: number) => {
          for (let i = 1; i <= 4; i++) {
            const fill = document.getElementById(`dash-fill-${i}`);
            if (fill) {
              const start = (i - 1) * 0.25;
              const end = i * 0.25;
              let progress = (scroll - start) / (end - start);
              progress = Math.max(0, Math.min(1, progress));
              fill.style.height = `${progress * 100}%`;
            }
          }

          const windows = document.querySelectorAll<HTMLElement>('.laocoon-window');
          const vh = window.innerHeight;
          windows.forEach((win) => {
            const rect = win.getBoundingClientRect();
            const isVisible = rect.top < vh * 0.82 && rect.bottom > vh * 0.15;
            win.classList.toggle('active', isVisible);
          });
        };

        const targetLookAt = new THREE.Vector3();
        const targetPos = new THREE.Vector3();

        // 9. Animation Loop
        const animate = () => {
          if (disposed) return;
          animationFrameId = requestAnimationFrame(animate);

          const deltaTime = Math.min(clock.getDelta(), 0.1);
          const elapsed = clock.getElapsedTime();

          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const scrollTop =
            window.scrollY !== undefined
              ? window.scrollY
              : window.pageYOffset !== undefined
              ? window.pageYOffset
              : document.documentElement.scrollTop;
          const targetScroll = Math.max(0, Math.min(1, scrollTop / maxScroll));

          // Smooth physical lerp
          currentScroll += (targetScroll - currentScroll) * 0.035;

          mouseX += (targetMouseX - mouseX) * 0.05;
          mouseY += (targetMouseY - mouseY) * 0.05;

          outerCursorX += (cursorX - outerCursorX) * 0.2;
          outerCursorY += (cursorY - outerCursorY) * 0.2;
          if (cursorOuterRef.current) {
            cursorOuterRef.current.style.left = `${outerCursorX}px`;
            cursorOuterRef.current.style.top = `${outerCursorY}px`;
          }

          if (modelPivot) {
            modelPivot.rotation.y = mouseX * 0.25;
            modelPivot.rotation.x = mouseY * 0.15;
          }

          // Balança oscila no topo e estabiliza conforme rola
          const rock = 1.0 - smooth(0.18, 0.42, currentScroll);
          const scrollVelocity = Math.abs(targetScroll - currentScroll);
          const tilt =
            0.075 * rock * Math.sin(elapsed * 0.75) +
            0.012 * Math.sin(elapsed * 0.45) +
            Math.min(scrollVelocity * 0.6, 0.05);
          const swing = (0.02 * rock + 0.006) * Math.sin(elapsed * 1.25);
          updateScaleRig(tilt, swing);

          // Sparks physics
          if (sparkParticles) {
            const positions = sparkParticles.geometry.attributes.position.array;
            const speedMultiplier = 1.0 + scrollVelocity * 9.0;
            const turbulence = scrollVelocity * 0.8;

            for (let i = 0; i < sparkCount; i++) {
              const idx = i * 3;
              const data = sparkData[i];
              positions[idx] += data.speedX * deltaTime * speedMultiplier;
              positions[idx + 1] += data.speedY * deltaTime * speedMultiplier;
              positions[idx + 2] += data.speedZ * deltaTime * speedMultiplier;

              const currentSway = data.swayRadius * (1.0 + turbulence * 4.0);
              positions[idx] +=
                Math.sin(elapsed * data.swaySpeed + data.phase) * currentSway * deltaTime;
              positions[idx + 2] +=
                Math.cos(elapsed * data.swaySpeed + data.phase) * currentSway * deltaTime;

              if (
                positions[idx + 1] > 3.0 ||
                Math.abs(positions[idx]) > 3.5 ||
                Math.abs(positions[idx + 2]) > 3.5
              ) {
                positions[idx + 1] = -2.5;
                positions[idx] = (Math.random() - 0.5) * 3.0;
                positions[idx + 2] = (Math.random() - 0.5) * 3.0;
              }
            }
            sparkParticles.geometry.attributes.position.needsUpdate = true;
          }

          // 360° camera orbit driven by scroll
          const phi = currentScroll * Math.PI * 2.0;
          const y = 0.35 + Math.sin(currentScroll * Math.PI) * 0.8;
          const radius = 4.2 - Math.sin(currentScroll * Math.PI) * 0.6;
          targetPos.set(radius * Math.sin(phi), y, radius * Math.cos(phi));
          camera.position.lerp(targetPos, 0.035);

          // Framing: Balança em destaque na primeira metade; abre espaço para o Agricultor ao fundo na segunda metade
          const transitionProgress = Math.min(1.0, currentScroll / 0.28);
          const easeFactor = (Math.cos(transitionProgress * Math.PI) + 1.0) * 0.5;
          const farmProgress = smooth(0.34, 0.54, currentScroll);
          const screenOffset = -0.85 * easeFactor + 1.05 * farmProgress;
          const camR = Math.hypot(camera.position.x, camera.position.z) || 1;
          targetLookAt.set(
            (camera.position.z / camR) * screenOffset,
            -0.15,
            (-camera.position.x / camR) * screenOffset
          );
          camera.lookAt(targetLookAt);

          // Uniforms update
          shaderUniforms.uTime.value = elapsed;
          shaderUniforms.uMouse.value.set(mouseX, -mouseY);
          shaderUniforms.uScroll.value = currentScroll;
          shaderUniforms.uFarm.value = farmProgress;

          updateGridDots(currentScroll);
          updateStoryProgressAndWindows(currentScroll);

          renderer.render(scene, camera);
        };

        onWindowResize();
        animate();
      } catch (err) {
        console.error('Erro ao iniciar WebGL Three.js:', err);
      }
    };

    initWebGL();

    return () => {
      disposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (cleanupResize) cleanupResize();
      if (cleanupMouse) cleanupMouse();
    };
  }, []);

  return (
    <>
      <div ref={cursorInnerRef} className="cursor-inner" />
      <div ref={cursorOuterRef} className="cursor-outer" />

      <div className="grid-horizontal-line" />
      <div className="grid-lines">
        <div className="grid-line">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
        </div>
        <div className="grid-line">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
        </div>
        <div className="grid-line">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
        </div>
        <div className="grid-line">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
        </div>
        <div className="grid-line story-progress-container">
          <div className="grid-dot top" />
          <div className="grid-dot bottom" />
          <div className="story-dashes">
            <div className="story-dash">
              <div className="story-dash-fill" id="dash-fill-1" />
            </div>
            <div className="story-dash">
              <div className="story-dash-fill" id="dash-fill-2" />
            </div>
            <div className="story-dash">
              <div className="story-dash-fill" id="dash-fill-3" />
            </div>
            <div className="story-dash">
              <div className="story-dash-fill" id="dash-fill-4" />
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} id="webgl" />
    </>
  );
};
