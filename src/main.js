import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as satellite from 'satellite.js'
import './style.css'

const FALLBACK_TLE = `
CALSPHERE 1
1 00900U 64063C   26131.17804288  .00000518  00000+0  51754-3 0  9997
2 00900  90.2229  70.8981 0028307  47.0476  61.0608 13.76580255 66337
LCS 1
1 01361U 65034C   26131.01190882  .00000009  00000+0  64393-4 0  9998
2 01361  32.1421 265.2979 0012939 349.0561  10.9654  9.89310339206208
TEMPSAT 1
1 01512U 65065E   26131.21549939  .00000011  00000+0  46888-5 0  9996
2 01512  90.0009 212.5868 0069254 354.1685  32.4775 13.33592222955121
LES-5
1 02866U 67066E   26131.19457177 -.00000084  00000+0  00000+0 0  9992
2 02866   2.5389  97.4194 0053502 212.9785 215.3109  1.09425992130639
LAGEOS 1
1 08820U 76039A   26130.34611894  .00000015  00000+0  00000+0 0  9995
2 08820 109.8045 166.3881 0044676 310.3838  72.1044  6.38664731910724
LAGEOS 2
1 22195U 92070B   26123.88481470 -.00000009  00000+0  00000+0 0  9999
2 22195  52.6619 294.6614 0137698 167.9216 346.2011  6.47293653792558
HST
1 20580U 90037B   26130.91128385  .00004942  00000+0  15600-3 0  9996
2 20580  28.4758 335.2524 0002203  85.6374 274.4473 15.30349034782858
STARLETTE
1 07646U 75010A   26131.14913300 -.00000142  00000+0 -21286-6 0  9993
2 07646  49.8249 250.7925 0205617 300.6775  57.3996 13.82349929589416
AJISAI
1 16908U 86061A   26131.19411671 -.00000095  00000+0  18762-4 0  9990
2 16908  50.0093 261.1488 0011410  86.8432 341.7412 12.44516186475782
NAVSTAR 43
1 24876U 97035A   26130.30949736  .00000063  00000+0  00000+0 0  9991
2 24876  55.9754 100.0554 0100561  56.3339 304.6075  2.00563930211198
NAVSTAR 46
1 25933U 99055A   26131.14996338 -.00000040  00000+0  00000+0 0  9999
2 25933  51.4983 297.0881 0106579 173.9107   5.0980  2.00564166194832
NAVSTAR 48
1 26407U 00040A   26130.40916068  .00000002  00000+0  00000+0 0  9999
2 26407  54.8580 216.6628 0121441 302.3501  64.5345  2.00557393189198
AQUA
1 27424U 02022A   26131.17379185  .00000520  00000+0  11330-3 0  9996
2 27424  98.4257  99.7243 0002111  79.4252  10.7491 14.62099798277861
TERRA
1 25994U 99068A   26131.17279336  .00000232  00000+0  56171-4 0  9992
2 25994  97.9482 182.1815 0002264  22.8205  34.0948 14.61072867404209
AURA
1 28376U 04026A   26131.14772736  .00000515  00000+0  11419-3 0  9997
2 28376  98.3396  87.3017 0001689  77.6065 282.5325 14.61271126160800
CALSPHERE 2
1 00902U 64063E   26131.11705896  .00000027  00000+0  28264-4 0  9994
2 00902  90.2362  74.9031 0017927 341.2994  39.2967 13.52897395851256
COSMOS 1989
1 19751U 89001C   26131.18418940  .00000010  00000+0  00000+0 0  9998
2 19751  64.9255  73.4603 0023352 217.6553 152.7151  2.13155987290580
SWAS
1 25560U 98071A   26130.97259038  .00001891  00000+0  12467-3 0  9999
2 25560  69.8965 323.4700 0008008 295.9890  64.0448 15.09357658491650
SCD 1
1 22490U 93009B   26131.16772975  .00000349  00000+0  44563-4 0  9996
2 22490  24.9692  76.1423 0042201 106.1847 277.1801 14.46104352755755
NOAA 19
1 33591U 09005A   26131.18000000  .00000000  00000+0  00000+0 0  9993
2 33591  99.1900  60.0000 0012000  0.0000  0.0000 14.12000000000000
ORBCOMM FM06
1 25118U 97084G   26131.03232700  .00000805  00000+0  25626-3 0  9991
2 25118  45.0136 231.5646 0001426 205.7352 323.9451 14.47471842489002
TDRS 3
1 19548U 88091B   26130.95818144 -.00000293  00000+0  00000+0 0  9998
2 19548  12.6309 341.2456 0039622 357.1965 186.4258  1.00269799125019
TDRS 5
1 21639U 91054B   26130.79218372  .00000092  00000+0  00000+0 0  9990
2 21639  14.0764 354.0544 0006890 278.1476  73.9407  1.00276762127335
TDRS 6
1 22314U 93003B   26131.18246455 -.00000288  00000+0  00000+0 0  9992
2 22314  14.1828 357.3377 0006432 174.7069  76.7645  1.00268283122035
TDRS 7
1 23613U 95035B   26131.12794994 -.00000234  00000+0  00000+0 0  9993
2 23613  13.3930 348.4484 0011112  67.9391 307.8548  1.00274296112888
TIMED
1 26998U 01055B   26130.94162250  .00000829  00000+0  79016-4 0  9991
2 26998  74.0671 310.0081 0001049 187.4151 172.7018 14.95201872325257
DMSP 5D-3 F16
1 28054U 03048A   26131.17440403 -.00000005  00000+0  21112-4 0  9996
2 28054  98.9914 154.7538 0005980 248.3558 198.4967 14.14479470164254
XMM-NEWTON
1 25989U 99066A   26131.44955799  .00000109  00000+0  00000+0 0  9996
2 25989  64.6811 283.4559 4686766  65.5547   0.1364  0.50125831 22814
POLAR
1 23802U 96013A   26129.52569769  .00000082  00000+0  00000+0 0  9991
2 23802  79.8145 227.5015 6431913 210.4085  87.5032  1.29845961144357
`.trim()

const ZONE_COLORS = { LEO: 0xFF4444, MEO: 0xFFD700, GEO: 0x00FF88 }
const LEO_MIN = 200, LEO_MAX = 2000, MEO_MAX = 35000
const EARTH_RADIUS_KM = 6371
const COLLISION_THRESHOLD = 0.05
const MAX_DEBRIS = 500
const REFRESH_INTERVAL_MS = 2 * 60 * 60 * 1000
const FETCH_TIMEOUT_MS = 10000

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000)
document.body.prepend(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 1.5
controls.maxDistance = 10
controls.enablePan = false

const earthGeometry = new THREE.SphereGeometry(1.0, 64, 64)
const textureLoader = new THREE.TextureLoader()
const earthTexture = textureLoader.load(
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'
)
const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture })
const earth = new THREE.Mesh(earthGeometry, earthMaterial)
scene.add(earth)

const atmosphereGeometry = new THREE.SphereGeometry(1.01, 64, 64)
const atmosphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x4488ff, transparent: true, opacity: 0.1, side: THREE.FrontSide
})
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
scene.add(atmosphere)

const starCount = 5000
const starPositions = new Float32Array(starCount * 3)
for (let i = 0, j = 0; i < starCount; i++) {
  const r = 50 + Math.random() * 150
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  starPositions[j++] = r * Math.sin(phi) * Math.cos(theta)
  starPositions[j++] = r * Math.sin(phi) * Math.sin(theta)
  starPositions[j++] = r * Math.cos(phi)
}
const starGeometry = new THREE.BufferGeometry()
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 }))
scene.add(stars)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
directionalLight.position.set(5, 3, 5)
scene.add(directionalLight)

let debrisList = []
let isPaused = false
let speedMultiplier = 1
let dataStatus = 'loading'
let activeWarnings = []
let collisionInterval = null
let simulationTimeMs = Date.now()
let lastFrameTimeMs = 0
let clock = new THREE.Clock()

function getZone(altitude) {
  if (altitude >= LEO_MIN && altitude < LEO_MAX) return 'LEO'
  if (altitude >= LEO_MAX && altitude < MEO_MAX) return 'MEO'
  if (altitude >= MEO_MAX) return 'GEO'
  return null
}

function parseTLE(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)
  const objects = []
  for (let i = 0; i + 2 < lines.length; i += 3) {
    const name = lines[i].replace(/\s+$/, '')
    const line1 = lines[i + 1]
    const line2 = lines[i + 2]
    if (!line1.startsWith('1 ') || !line2.startsWith('2 ')) {
      i -= 2
      continue
    }
    objects.push({ name, line1, line2 })
  }
  return objects
}

function propagateDebris(satrec, date) {
  try {
    const pv = satellite.propagate(satrec, date)
    if (!pv || !pv.position) return null
    const eci = pv.position
    const mag = Math.sqrt(eci.x * eci.x + eci.y * eci.y + eci.z * eci.z)
    const altitude = mag - EARTH_RADIUS_KM
    const speed = Math.sqrt(398600 / mag)
    return {
      position: new THREE.Vector3(eci.x / EARTH_RADIUS_KM, eci.z / EARTH_RADIUS_KM, eci.y / EARTH_RADIUS_KM),
      altitude, speed
    }
  } catch {
    return null
  }
}

function createDebrisObjects(tleObjects) {
  const newDebris = []
  let count = 0
  for (const obj of tleObjects) {
    if (count >= MAX_DEBRIS) break
    let satrec
    try { satrec = satellite.twoline2satrec(obj.line1, obj.line2) } catch { continue }
    const result = propagateDebris(satrec, new Date())
    if (!result || isNaN(result.altitude)) continue
    const zone = getZone(result.altitude)
    if (!zone) continue
    const geometry = new THREE.SphereGeometry(0.008, 6, 6)
    const material = new THREE.MeshBasicMaterial({ color: ZONE_COLORS[zone] })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.copy(result.position)
    scene.add(mesh)
    newDebris.push({ mesh, satrec, name: obj.name, altitude: result.altitude, zone, speed: result.speed })
    count++
  }
  return newDebris
}

function clearDebris() {
  for (const d of debrisList) {
    scene.remove(d.mesh)
    d.mesh.geometry.dispose()
    d.mesh.material.dispose()
  }
  debrisList = []
}

function removeWarningLine(line) {
  scene.remove(line)
  line.geometry.dispose()
  line.material.dispose()
}

function updateDebrisPositions(date) {
  const checks = {}
  document.querySelectorAll('[data-zone]').forEach(cb => { checks[cb.dataset.zone] = cb.checked })
  for (const d of debrisList) {
    const result = propagateDebris(d.satrec, date)
    if (!result) { d.mesh.visible = false; continue }
    d.mesh.position.copy(result.position)
    d.altitude = result.altitude
    d.speed = result.speed
    d.zone = getZone(result.altitude)
    if (d.zone) {
      d.mesh.material.color.setHex(ZONE_COLORS[d.zone])
      d.mesh.visible = checks[d.zone] || false
    }
  }
}

function checkCollisions() {
  if (activeWarnings.length > 0) return
  const visible = debrisList.filter(d => d.mesh.visible)
  if (visible.length < 2) return
  const sampleSize = Math.min(100, Math.floor(visible.length / 2))
  let closest = null, minDist = Infinity
  for (let i = 0; i < sampleSize; i++) {
    const a = Math.floor(Math.random() * visible.length)
    let b = Math.floor(Math.random() * visible.length)
    if (a === b) b = (b + 1) % visible.length
    const dist = visible[a].mesh.position.distanceTo(visible[b].mesh.position)
    if (dist < minDist) { minDist = dist; closest = [visible[a], visible[b], dist] }
  }
  if (!closest || minDist > COLLISION_THRESHOLD) return
  const [objA, objB, dist] = closest
  const realDist = dist * EARTH_RADIUS_KM
  const probability = Math.max(0, Math.min(100, ((COLLISION_THRESHOLD - dist) / COLLISION_THRESHOLD) * 100))
  let riskLevel = 'LOW', action = 'Monitor Only'
  if (probability > 30) { riskLevel = 'HIGH'; action = 'Execute Maneuver' }
  else if (probability > 10) { riskLevel = 'MEDIUM'; action = 'Prepare DAM' }

  const points = [objA.mesh.position.clone(), objB.mesh.position.clone()]
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0xff0000 })
  )
  scene.add(line)
  showWarning(objA.name, objB.name, realDist, probability, riskLevel, action)

  const originalScales = [objA.mesh.scale.clone(), objB.mesh.scale.clone()]
  let pulsePhase = 0
  const pulseInterval = setInterval(() => {
    pulsePhase += 0.1
    const s = 1 + 0.5 * (1 + Math.sin(pulsePhase * Math.PI * 2)) * 0.5
    objA.mesh.scale.setScalar(s)
    objB.mesh.scale.setScalar(s)
  }, 50)

  const warnObj = { line, objA, objB, pulseInterval, originalScales }
  activeWarnings.push(warnObj)
  setTimeout(() => {
    clearInterval(pulseInterval)
    objA.mesh.scale.copy(originalScales[0])
    objB.mesh.scale.copy(originalScales[1])
    removeWarningLine(line)
    const idx = activeWarnings.indexOf(warnObj)
    if (idx >= 0) activeWarnings.splice(idx, 1)
    dismissWarning()
  }, 5000)
}

function showWarning(nameA, nameB, distKm, probability, riskLevel, action) {
  const existing = document.getElementById('collision-warning')
  if (existing) existing.remove()
  const riskColors = { LOW: 'bg-green-600', MEDIUM: 'bg-yellow-600', HIGH: 'bg-red-600' }
  const riskBadges = { LOW: ' LOW', MEDIUM: ' MEDIUM', HIGH: ' HIGH' }
  const panel = document.createElement('div')
  panel.id = 'collision-warning'
  panel.className = 'fixed bottom-4 left-4 bg-red-900/80 backdrop-blur-md border border-red-500 rounded-xl p-4 text-white font-orbitron z-40 max-w-xs'
  panel.innerHTML = `
    <div class="text-sm font-bold animate-pulse mb-2">⚠️ CONJUNCTION WARNING</div>
    <div class="text-xs space-y-1">
      <div><span class="text-gray-400">Object 1:</span> ${nameA}</div>
      <div><span class="text-gray-400">Object 2:</span> ${nameB}</div>
      <div><span class="text-gray-400">Distance:</span> ${distKm.toFixed(1)} km</div>
      <div><span class="text-gray-400">Probability:</span> ${probability.toFixed(1)}%</div>
      <div><span class="text-gray-400">Risk:</span> <span class="${riskColors[riskLevel]} px-2 py-0.5 rounded text-xs">${riskBadges[riskLevel]}</span></div>
      <div><span class="text-gray-400">Action:</span> ${action}</div>
    </div>`
  document.body.appendChild(panel)
}

function dismissWarning() {
  const el = document.getElementById('collision-warning')
  if (el && activeWarnings.length === 0) el.remove()
}

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let tooltipEl = null

function setupHover() {
  tooltipEl = document.createElement('div')
  tooltipEl.className = 'fixed bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white text-xs font-orbitron pointer-events-none z-50 hidden'
  document.body.appendChild(tooltipEl)
  renderer.domElement.addEventListener('mousemove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const meshes = debrisList.filter(d => d.mesh.visible).map(d => d.mesh)
    const intersects = raycaster.intersectObjects(meshes)
    if (intersects.length > 0) {
      const debris = debrisList.find(d => d.mesh === intersects[0].object)
      if (debris) {
        tooltipEl.classList.remove('hidden')
        tooltipEl.style.left = (e.clientX + 15) + 'px'
        tooltipEl.style.top = (e.clientY + 15) + 'px'
        const zoneColors = { LEO: '#FF4444', MEO: '#FFD700', GEO: '#00FF88' }
        tooltipEl.innerHTML = `
          <div class="font-semibold mb-1">${debris.name}</div>
          <div>Altitude: ${debris.altitude.toFixed(1)} km</div>
          <div>Zone: <span style="color:${zoneColors[debris.zone]}">${debris.zone}</span></div>
          <div>Speed: ${debris.speed.toFixed(2)} km/s</div>`
      }
    } else {
      tooltipEl.classList.add('hidden')
    }
  })
}

function fetchTLE() {
  return new Promise((resolve) => {
    const visual = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle'
    const stations = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle'
    const urls = [
      'https://corsproxy.io/?url=' + encodeURIComponent(visual),
      visual,
      'https://corsproxy.io/?url=' + encodeURIComponent(stations),
      stations
    ]
    function tryFetch(idx) {
      if (idx >= urls.length) {
        resolve({ status: 'fallback', data: FALLBACK_TLE })
        return
      }
      const signal = AbortSignal.timeout(FETCH_TIMEOUT_MS)
      fetch(urls[idx], { signal })
        .then(r => { if (!r.ok) throw new Error(); return r.text() })
        .then(text => resolve({ status: 'live', data: text }))
        .catch(() => tryFetch(idx + 1))
    }
    tryFetch(0)
  })
}

function showToast(msg) {
  const t = document.createElement('div')
  t.className = 'fixed top-20 right-4 bg-green-900/80 backdrop-blur-md border border-green-500 rounded-lg px-4 py-2 text-white text-xs font-orbitron z-50 transition-opacity duration-500'
  t.textContent = msg
  document.body.appendChild(t)
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 500) }, 3000)
}

async function loadTLE() {
  dataStatus = 'loading'
  updateUI()
  const result = await fetchTLE()
  dataStatus = result.status
  const objects = parseTLE(result.data)
  clearDebris()
  debrisList = createDebrisObjects(objects)
  hideIntro()
  updateUI()
  applyZoneFilters()
}

function refreshTLE() {
  loadTLE().then(() => { if (dataStatus === 'live') showToast('🔄 Data Refreshed') })
}

let animFrameId = null

function animate(timestamp) {
  animFrameId = requestAnimationFrame(animate)
  if (!lastFrameTimeMs) lastFrameTimeMs = timestamp
  const deltaMs = timestamp - lastFrameTimeMs
  lastFrameTimeMs = timestamp
  if (!isPaused && deltaMs < 200) {
    simulationTimeMs += deltaMs * speedMultiplier
  }
  const currentDate = new Date(simulationTimeMs)
  updateDebrisPositions(currentDate)
  earth.rotation.y += 0.0005
  controls.update()
  renderer.render(scene, camera)
}

function initScene() {
  simulationTimeMs = Date.now()
  lastFrameTimeMs = 0
  setupHover()
  collisionInterval = setInterval(checkCollisions, 3000)
  animate()
  setInterval(refreshTLE, REFRESH_INTERVAL_MS)
}

function togglePanel() {
  const panel = document.getElementById('ui-panel')
  const overlay = document.getElementById('panel-overlay')
  const btn = document.getElementById('panel-toggle')
  if (!panel) return
  panel.classList.toggle('panel-open')
  const isOpen = panel.classList.contains('panel-open')
  if (overlay) overlay.classList.toggle('hidden', !isOpen)
  if (btn) btn.textContent = isOpen ? '✕' : '☰'
}

function createUI() {
  const overlay = document.createElement('div')
  overlay.id = 'panel-overlay'
  overlay.className = 'fixed inset-0 bg-black/50 z-30 hidden'
  document.body.appendChild(overlay)
  overlay.addEventListener('click', togglePanel)

  const toggleBtn = document.createElement('button')
  toggleBtn.id = 'panel-toggle'
  toggleBtn.className = 'fixed right-4 top-4 z-30 w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white text-lg hover:bg-white/20 transition font-orbitron'
  toggleBtn.textContent = '☰'
  toggleBtn.addEventListener('click', togglePanel)
  document.body.appendChild(toggleBtn)

  const panel = document.createElement('div')
  panel.id = 'ui-panel'
  panel.className = 'fixed right-4 top-4 w-64 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white font-orbitron z-30'
  panel.innerHTML = `
    <div class="flex items-center justify-between mb-1">
      <div class="text-lg font-bold">🛸 DEBRIS TRACKER</div>
      <button id="panel-close" class="hidden md:hidden text-gray-400 hover:text-white text-lg leading-none">✕</button>
    </div>
    <div id="data-status" class="text-xs mb-3">Loading...</div>
    <div id="utc-time" class="text-xs text-gray-400 mb-3">IST: --</div>
    <div class="text-xs mb-2 font-semibold">Debris Counts</div>
    <div class="text-xs space-y-1 mb-3">
      <div>Total: <span id="count-total">0</span></div>
      <div style="color:#FF4444">LEO: <span id="count-leo">0</span></div>
      <div style="color:#FFD700">MEO: <span id="count-meo">0</span></div>
      <div style="color:#00FF88">GEO: <span id="count-geo">0</span></div>
    </div>
    <div class="flex gap-2 mb-3">
      <button id="pause-btn" class="flex-1 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 text-xs transition">⏸️ Pause</button>
    </div>
    <div class="mb-3">
      <label class="text-xs text-gray-400">Speed: <span id="speed-label">1x</span></label>
      <input type="range" id="speed-slider" min="1" max="100" value="1" class="w-full accent-blue-500" />
    </div>
    <div class="text-xs mb-2 font-semibold">Zone Filters</div>
    <div class="space-y-1 mb-3">
      <label class="flex items-center gap-2 text-xs"><input type="checkbox" checked data-zone="LEO" class="accent-red-500" /> <span style="color:#FF4444">LEO</span></label>
      <label class="flex items-center gap-2 text-xs"><input type="checkbox" checked data-zone="MEO" class="accent-yellow-500" /> <span style="color:#FFD700">MEO</span></label>
      <label class="flex items-center gap-2 text-xs"><input type="checkbox" checked data-zone="GEO" class="accent-green-500" /> <span style="color:#00FF88">GEO</span></label>
    </div>
    <button id="refresh-btn" class="w-full bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 text-xs transition">🔄 Refresh Data</button>`
  document.body.appendChild(panel)

  const legend = document.createElement('div')
  legend.className = 'fixed bottom-4 right-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 font-orbitron text-xs text-white z-30 space-y-1'
  legend.innerHTML = `
    <div><span style="color:#FF4444">●</span> LEO — Low Earth Orbit (200–2000 km)</div>
    <div><span style="color:#FFD700">●</span> MEO — Medium Earth Orbit (2000–35,000 km)</div>
    <div><span style="color:#00FF88">●</span> GEO — Geostationary Orbit (35,000+ km)</div>`
  document.body.appendChild(legend)

  document.getElementById('panel-close').addEventListener('click', togglePanel)

  document.getElementById('pause-btn').addEventListener('click', () => {
    isPaused = !isPaused
    const btn = document.getElementById('pause-btn')
    btn.textContent = isPaused ? '▶️ Play' : '⏸️ Pause'
    if (!isPaused) {
      lastFrameTimeMs = performance.now()
    }
  })

  document.getElementById('speed-slider').addEventListener('input', (e) => {
    speedMultiplier = parseInt(e.target.value)
    document.getElementById('speed-label').textContent = speedMultiplier + 'x'
  })

  document.querySelectorAll('[data-zone]').forEach(cb => {
    cb.addEventListener('change', () => applyZoneFilters())
  })

  document.getElementById('refresh-btn').addEventListener('click', refreshTLE)

  const infoBtn = document.createElement('button')
  infoBtn.className = 'fixed top-4 left-4 z-30 w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-white text-sm hover:bg-white/20 transition font-orbitron'
  infoBtn.textContent = 'ℹ️'
  document.body.appendChild(infoBtn)
  infoBtn.addEventListener('click', () => {
    document.getElementById('info-modal').classList.remove('hidden')
  })

  const modal = document.createElement('div')
  modal.id = 'info-modal'
  modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 hidden'
  modal.innerHTML = `
    <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-md mx-4 text-white font-orbitron relative">
      <button id="modal-close" class="absolute top-3 right-3 text-gray-400 hover:text-white text-lg">✕</button>
      <h2 class="text-lg font-bold mb-4">🛸 Space Debris Tracker</h2>
      <div class="text-xs space-y-3 leading-relaxed">
        <p><strong>Real-Time Debris Tracking</strong> — Interactive 3D simulator visualizing actual space debris orbiting Earth using real TLE data from CelesTrak.</p>
        <p><strong>TLE Data</strong> — Two-Line Element sets are the standard format for orbital parameters. Updated by the US Space Force every few hours for all tracked objects.</p>
        <p><strong>SGP4</strong> — Simplified General Perturbations model 4 is the mathematical model used by NASA and NORAD to propagate satellite positions from TLE data.</p>
        <p><strong>Kessler Syndrome</strong> — A cascading collision scenario where debris density in LEO becomes so high that collisions generate more debris, potentially making orbit unusable.</p>
        <p><strong>Conjunction Warning</strong> — Alerts when two objects come within dangerous proximity. Mirrors NASA CARA (Conjunction Assessment Risk Analysis) system.</p>
      </div>
    </div>`
  document.body.appendChild(modal)

  document.getElementById('modal-close').addEventListener('click', () => modal.classList.add('hidden'))
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden') })

  setInterval(() => {
    const el = document.getElementById('utc-time')
    if (el) el.textContent = 'IST: ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })
  }, 1000)

  setInterval(updateDebrisCounts, 1000)
}

function applyZoneFilters() {
  const checks = {}
  document.querySelectorAll('[data-zone]').forEach(cb => { checks[cb.dataset.zone] = cb.checked })
  for (const d of debrisList) {
    d.mesh.visible = checks[d.zone] || false
  }
}

function updateDebrisCounts() {
  const total = debrisList.length
  const leo = debrisList.filter(d => d.zone === 'LEO').length
  const meo = debrisList.filter(d => d.zone === 'MEO').length
  const geo = debrisList.filter(d => d.zone === 'GEO').length
  const byId = id => {
    const el = document.getElementById(id)
    if (el) el.textContent = { total, leo, meo, geo }[id.split('-')[1]]
  }
  const totalEl = document.getElementById('count-total')
  const leoEl = document.getElementById('count-leo')
  const meoEl = document.getElementById('count-meo')
  const geoEl = document.getElementById('count-geo')
  if (totalEl) totalEl.textContent = total
  if (leoEl) leoEl.textContent = leo
  if (meoEl) meoEl.textContent = meo
  if (geoEl) geoEl.textContent = geo
}

function updateUI() {
  const el = document.getElementById('data-status')
  if (!el) return
  if (dataStatus === 'loading') el.innerHTML = '<span class="text-yellow-400">⏳ Loading Data...</span>'
  else if (dataStatus === 'live') el.innerHTML = '<span class="text-green-400">✅ Live Data</span>'
  else if (dataStatus === 'fallback') el.innerHTML = '<span class="text-yellow-400">⚠️ Fallback Data</span>'
}

function showIntro() {
  const overlay = document.createElement('div')
  overlay.id = 'intro-overlay'
  overlay.className = 'fixed inset-0 bg-black flex flex-col items-center justify-center z-50 font-orbitron text-white transition-opacity duration-1000'
  overlay.innerHTML = `
    <div class="text-3xl font-bold mb-3">🛸 SPACE DEBRIS TRACKER</div>
    <div class="text-sm text-gray-400 mb-6">Real-Time Orbital Surveillance System</div>
    <div class="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
      <div class="h-full bg-blue-500 animate-pulse rounded-full"></div>
    </div>`
  document.body.appendChild(overlay)
}

function hideIntro() {
  const overlay = document.getElementById('intro-overlay')
  if (overlay) {
    overlay.style.opacity = '0'
    setTimeout(() => overlay.remove(), 1000)
  }
}

renderer.domElement.addEventListener('webglcontextlost', (e) => {
  e.preventDefault()
  setTimeout(() => renderer.forceContextRestore(), 1000)
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

showIntro()
createUI()
loadTLE().then(() => initScene())
