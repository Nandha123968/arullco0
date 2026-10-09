import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
  intensity?: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  className = '',
  intensity = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [fps, setFps] = useState<number>(60);
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainBlobMeshRef = useRef<THREE.Mesh | null>(null);
  const leftBlobMeshRef = useRef<THREE.Mesh | null>(null);
  const rightBlobMeshRef = useRef<THREE.Mesh | null>(null);
  const baseGeomMainRef = useRef<Float32Array | null>(null);
  const baseGeomLeftRef = useRef<Float32Array | null>(null);
  const baseGeomRightRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false });
  const animFrameRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    cameraRef.current = camera;

    // 2. High-performance WebGL Renderer with ACES tone mapping
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 3. Lighting setup for Iridescent Pearlescent Chromatic Glow (matching Image 1)
    const ambientLight = new THREE.AmbientLight(0x0f111a, 1.8);
    scene.add(ambientLight);

    // Key Orbiting Colored Lights (Golden Orange, Magenta, Cyan, Violet, Lime)
    const lightGold = new THREE.PointLight(0xff9900, 5.2, 35);
    lightGold.position.set(-3.5, 3.5, 4.0);
    scene.add(lightGold);

    const lightMagenta = new THREE.PointLight(0xff007f, 6.0, 35);
    lightMagenta.position.set(4.0, -2.5, 3.5);
    scene.add(lightMagenta);

    const lightCyan = new THREE.PointLight(0x00f0ff, 5.5, 35);
    lightCyan.position.set(-4.0, -3.0, 3.5);
    scene.add(lightCyan);

    const lightViolet = new THREE.PointLight(0x8a2be2, 4.5, 35);
    lightViolet.position.set(3.5, 4.0, -2.0);
    scene.add(lightViolet);

    const lightLime = new THREE.PointLight(0x00ff66, 3.8, 30);
    lightLime.position.set(0, 5.5, 2.0);
    scene.add(lightLime);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(0, 6, 6);
    scene.add(dirLight);

    // 4. Iridescent Physical Material with Rainbow Sheen
    const createIridescentMaterial = () => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xf5f8fa),
        vertexColors: true,
        roughness: 0.08,
        metalness: 0.18,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        iridescence: 1.0,
        iridescenceIOR: 1.8,
        iridescenceThicknessRange: [120, 850],
        transmission: 0.22,
        thickness: 1.5,
        reflectivity: 1.0,
        side: THREE.DoubleSide,
      });
    };

    // 5. Morphing Fluid Geometries (Main Center Blob + Left & Right Floating Blobs from Image 1)
    // Main Blob
    const mainGeom = new THREE.IcosahedronGeometry(2.15, 36);
    const mainPos = mainGeom.attributes.position;
    baseGeomMainRef.current = new Float32Array(mainPos.array);

    // Initialize vertex colors for vibrant chromatic iridescent distribution
    const vertexCountMain = mainPos.count;
    const colorsMain = new Float32Array(vertexCountMain * 3);
    mainGeom.setAttribute('color', new THREE.BufferAttribute(colorsMain, 3));

    const mainMat = createIridescentMaterial();
    const mainBlob = new THREE.Mesh(mainGeom, mainMat);
    mainBlob.position.set(0, 0.15, 0);
    scene.add(mainBlob);
    mainBlobMeshRef.current = mainBlob;

    // Left Secondary Blob (matching Image 1)
    const leftGeom = new THREE.IcosahedronGeometry(1.2, 28);
    const leftPos = leftGeom.attributes.position;
    baseGeomLeftRef.current = new Float32Array(leftPos.array);
    const colorsLeft = new Float32Array(leftPos.count * 3);
    leftGeom.setAttribute('color', new THREE.BufferAttribute(colorsLeft, 3));

    const leftMat = createIridescentMaterial();
    const leftBlob = new THREE.Mesh(leftGeom, leftMat);
    leftBlob.position.set(-4.6, 0.4, -1.8);
    scene.add(leftBlob);
    leftBlobMeshRef.current = leftBlob;

    // Right Secondary Blob (matching Image 1)
    const rightGeom = new THREE.IcosahedronGeometry(1.25, 28);
    const rightPos = rightGeom.attributes.position;
    baseGeomRightRef.current = new Float32Array(rightPos.array);
    const colorsRight = new Float32Array(rightPos.count * 3);
    rightGeom.setAttribute('color', new THREE.BufferAttribute(colorsRight, 3));

    const rightMat = createIridescentMaterial();
    const rightBlob = new THREE.Mesh(rightGeom, rightMat);
    rightBlob.position.set(4.6, 0.3, -1.8);
    scene.add(rightBlob);
    rightBlobMeshRef.current = rightBlob;

    // Architectural Gallery Suspension Lines (descending from ceiling ceiling like Image 1)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.45 });

    const createCable = (x: number, y: number, z: number) => {
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 8, z),
        new THREE.Vector3(x, y, z),
      ]);
      const line = new THREE.Line(lineGeom, lineMat);
      scene.add(line);
      return line;
    };

    const cableCenter = createCable(0, 2.2, 0);
    const cableLeft = createCable(-4.6, 1.6, -1.8);
    const cableRight = createCable(4.6, 1.5, -1.8);

    // 6. Interactive Mouse Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleMouseDown = () => { mouseRef.current.isDown = true; };
    const handleMouseUp = () => { mouseRef.current.isDown = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 7. Window resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Context loss safety
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
    const handleContextRestored = () => {};
    const canvasElem = renderer.domElement;
    canvasElem.addEventListener('webglcontextlost', handleContextLost);
    canvasElem.addEventListener('webglcontextrestored', handleContextRestored);

    // 8. Dynamic Morphing & Chromatic Wave Computation
    // Organic multi-harmonic deformation function (simulates fluid surface tension waves)
    const deformMesh = (
      geom: THREE.BufferGeometry,
      basePositions: Float32Array,
      time: number,
      phaseOffset: number,
      amplitude: number,
      colorsArray: Float32Array
    ) => {
      const posAttr = geom.attributes.position;
      const pos = posAttr.array as Float32Array;
      const count = posAttr.count;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        // Normalize base vector
        const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
        const nx = bx / len;
        const ny = by / len;
        const nz = bz / len;

        // Multi-frequency organic fluid harmonics
        const t = time + phaseOffset;
        const wave1 = Math.sin(nx * 3.4 + t * 1.6) * Math.cos(ny * 3.1 + t * 1.3) * Math.sin(nz * 2.8 + t * 1.4);
        const wave2 = Math.sin(nx * 5.8 - t * 2.1) * Math.cos(nz * 4.9 + t * 1.7) * 0.42;
        const wave3 = Math.cos(ny * 6.2 + t * 1.1) * Math.sin(nz * 5.2 - t * 1.5) * 0.28;
        const wave4 = Math.sin(nx * 2.2 + ny * 2.5 + t * 0.9) * 0.35;

        const totalDisplacement = 1.0 + (wave1 + wave2 + wave3 + wave4) * amplitude;

        pos[i3] = bx * totalDisplacement;
        pos[i3 + 1] = by * totalDisplacement;
        pos[i3 + 2] = bz * totalDisplacement;

        // Dynamic iridescent chromatic color mapping across normal & wave crests
        // Produces the shimmering gold/magenta/cyan/violet specular glaze
        const colorFactor = (wave1 + wave2 * 0.5 + 1.0) * 0.5;
        const r = 0.5 + 0.5 * Math.sin(colorFactor * Math.PI * 2.5 + t * 0.8 + 0.0);
        const g = 0.5 + 0.5 * Math.sin(colorFactor * Math.PI * 2.5 + t * 0.8 + 2.1);
        const b = 0.5 + 0.5 * Math.sin(colorFactor * Math.PI * 2.5 + t * 0.8 + 4.2);

        colorsArray[i3] = r * 0.85 + 0.15;
        colorsArray[i3 + 1] = g * 0.85 + 0.15;
        colorsArray[i3 + 2] = b * 0.85 + 0.15;
      }

      posAttr.needsUpdate = true;
      geom.computeVertexNormals();

      const colorAttr = geom.attributes.color;
      if (colorAttr) colorAttr.needsUpdate = true;
    };

    // 9. Animation Loop
    let frameCounter = 0;
    let lastTime = performance.now();

    const animate = () => {
      const elapsedTime = clockRef.current.getElapsedTime();
      const speed = speedMultiplier * intensity;

      // FPS tracking
      frameCounter++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCounter * 1000) / (now - lastTime)));
        frameCounter = 0;
        lastTime = now;
      }

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const t = elapsedTime * speed;

      // Morph Central Sculpture
      if (mainBlobMeshRef.current && baseGeomMainRef.current) {
        const geom = mainBlobMeshRef.current.geometry;
        const colors = geom.attributes.color.array as Float32Array;
        deformMesh(geom, baseGeomMainRef.current, t, 0, 0.34, colors);

        // Gentle floating & mouse reactivity
        mainBlobMeshRef.current.position.y = 0.15 + Math.sin(t * 1.2) * 0.18 + mouseRef.current.y * 0.35;
        mainBlobMeshRef.current.position.x = mouseRef.current.x * 0.5;
        mainBlobMeshRef.current.rotation.y = t * 0.22 + mouseRef.current.x * 0.6;
        mainBlobMeshRef.current.rotation.x = Math.sin(t * 0.15) * 0.15 - mouseRef.current.y * 0.4;
      }

      // Morph Left Secondary Sculpture
      if (leftBlobMeshRef.current && baseGeomLeftRef.current) {
        const geom = leftBlobMeshRef.current.geometry;
        const colors = geom.attributes.color.array as Float32Array;
        deformMesh(geom, baseGeomLeftRef.current, t, 3.14, 0.3, colors);

        leftBlobMeshRef.current.position.y = 0.4 + Math.cos(t * 1.4) * 0.22;
        leftBlobMeshRef.current.rotation.y = -t * 0.18;
      }

      // Morph Right Secondary Sculpture
      if (rightBlobMeshRef.current && baseGeomRightRef.current) {
        const geom = rightBlobMeshRef.current.geometry;
        const colors = geom.attributes.color.array as Float32Array;
        deformMesh(geom, baseGeomRightRef.current, t, 1.85, 0.3, colors);

        rightBlobMeshRef.current.position.y = 0.3 + Math.sin(t * 1.35 + 1) * 0.22;
        rightBlobMeshRef.current.rotation.y = t * 0.16;
      }

      // Orbit Lights for Shimmering Iridescent Refractions
      lightGold.position.x = Math.sin(t * 0.7) * 6;
      lightGold.position.y = Math.cos(t * 0.5) * 4 + 1;
      lightMagenta.position.x = -Math.cos(t * 0.65) * 6;
      lightMagenta.position.y = Math.sin(t * 0.55) * 4;
      lightCyan.position.x = Math.cos(t * 0.8) * 5.5;
      lightCyan.position.z = Math.sin(t * 0.8) * 5.5;
      lightViolet.position.y = -Math.sin(t * 0.6) * 4 + 2;

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      canvasElem.removeEventListener('webglcontextlost', handleContextLost);
      canvasElem.removeEventListener('webglcontextrestored', handleContextRestored);

      [mainBlobMeshRef.current, leftBlobMeshRef.current, rightBlobMeshRef.current].forEach((mesh) => {
        if (mesh) {
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
          else mesh.material.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [intensity, speedMultiplier]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
        title="Interactive 3D Fluid Sculpture - Drag or move mouse to interact"
      />

      {/* Atmospheric Gallery Lighting & Dark Vignette (matching Image 1 architectural gallery) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#030305]/60 via-transparent to-[#030305] mix-blend-multiply" />
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-transparent to-[#020204]/85" />

      {/* Floating 3D HUD Control */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => setIsControlsOpen(!isControlsOpen)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-white/90 hover:text-white hover:border-[#00FF66]/50 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          aria-label="Toggle 3D fluid controls"
        >
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="tracking-wide uppercase text-[11px] font-mono">Iridescent Fluid</span>
          <span className="text-[10px] text-white/50 font-mono">({fps} FPS)</span>
        </button>

        {isControlsOpen && (
          <div className="flex items-center gap-2 p-1.5 bg-black/85 backdrop-blur-xl border border-white/15 rounded-lg shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <span className="text-[11px] text-white/70 font-mono px-2">Flow Speed:</span>
            {[0.5, 1, 1.8].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all cursor-pointer ${
                  speedMultiplier === s
                    ? 'bg-[#00FF66] text-black font-bold'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
