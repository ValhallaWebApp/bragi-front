import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('galleryContainer', { static: false }) galleryContainer!: ElementRef;

  // Definizione delle variabili necessarie per il rendering della scena con Three.js
  private scene!: THREE.Scene; // La scena 3D di Three.js
  private camera!: THREE.PerspectiveCamera; // La camera per visualizzare la scena
  private renderer!: THREE.WebGLRenderer; // Il renderer per disegnare la scena
  private controls!: OrbitControls; // Controlli per manipolare la visualizzazione con il mouse o il touch
  private playerAvatar!: THREE.Group; // Rappresenta l'avatar controllato dall'utente
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private velocity = new THREE.Vector3(); // Velocità di movimento dell'avatar
  private direction = new THREE.Vector3(); // Direzione di movimento dell'avatar
  private targetPosition?: THREE.Vector3; // Posizione target per il movimento verso un punto cliccato
  private mixer!: THREE.AnimationMixer;
  showHelp: boolean = true;
  popupVisible = false;
popupData: { title: string; description: string } | null = null;

private showArtworkInfo(data: { title: string; description: string }): void {
  this.popupData = data;
  this.popupVisible = true;
}

closePopup(): void {
  this.popupVisible = false;
  this.popupData = null;
}

  constructor() {}

  ngOnInit(): void {
    // Logica per l'inizializzazione del componente, se necessario
  }
  @ViewChild('minimap', { static: false }) minimapCanvas!: ElementRef;

  private initMinimap(): void {
    const canvas = this.minimapCanvas.nativeElement as HTMLCanvasElement;
    canvas.width = 200;
    canvas.height = 200;
  }
  private updateMinimap(): void {
    const canvas = this.minimapCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna la stanza (un quadrato centrale)
    ctx.fillStyle = '#333';
    ctx.fillRect(50, 50, 100, 100);

    // Disegna l'avatar
    ctx.fillStyle = 'red';
    ctx.beginPath();
    const x = 50 + (this.playerAvatar.position.x + 10) * 5;
    const y = 50 + (this.playerAvatar.position.z + 10) * 5;
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  ngAfterViewInit(): void {
    // Inizializza la scena e aggiunge gli elementi una volta che il DOM del componente è stato completamente caricato
    if (this.galleryContainer) {
      this.initScene(); // Inizializza la scena
      this.addLighting(); // Aggiunge luci alla scena
      this.addPlayerAvatar(); // Aggiunge l'avatar rappresentante il giocatore
      this.addRoomWalls(); // Aggiunge le pareti della stanza
      this.addArtworkFrames(); // Aggiunge i quadri alle pareti
      this.addControls(); // Aggiunge i controlli per muoversi nella scena
      this.animate(); // Avvia il ciclo di animazione
      this.initMinimap();
    }
  }

  // Gestisce il ridimensionamento della finestra per adattare la camera e il renderer
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = this.galleryContainer.nativeElement.clientWidth / this.galleryContainer.nativeElement.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.galleryContainer.nativeElement.clientWidth, this.galleryContainer.nativeElement.clientHeight);
    }
  }

  // Rileva la pressione dei tasti per muovere l'avatar
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = true;
        break;
    }
  }

  // Rileva il rilascio dei tasti per fermare il movimento dell'avatar
  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = false;
        break;
    }
  }

  // Rileva il doppio click per spostare l'avatar verso la zona indicata
  @HostListener('dblclick', ['$event'])
onDoubleClick(event: MouseEvent): void {
  const rect = this.renderer.domElement.getBoundingClientRect();
  const mouse = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, this.camera);
  const intersects = raycaster.intersectObjects(this.scene.children, true);

  if (intersects.length > 0) {
    const object:any = intersects[0].object;

    // Verifica se l'oggetto cliccato è un quadro
    if (object.userData?.isArtwork) {
      this.showArtworkInfo(object.userData); // Mostra il popup informativo
    } else {
      // Logica per il movimento dell'avatar
      const point = intersects[0].point;
      this.targetPosition = new THREE.Vector3(
        Math.max(-9, Math.min(9, point.x)),
        0.5,
        Math.max(-9, Math.min(9, point.z))
      );
    }
  }
}


  // Inizializza la scena, la camera e il renderer
  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0a0a0); // Imposta il colore di sfondo della scena

    // Configurazione della camera
    const aspectRatio = this.galleryContainer.nativeElement.clientWidth / this.galleryContainer.nativeElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.set(0, 2, 10); // Posiziona la camera inizialmente

    // Configurazione del renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.galleryContainer.nativeElement.clientWidth, this.galleryContainer.nativeElement.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.galleryContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  // Aggiunge la luce alla scena
  private addLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Luce ambientale generale
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Luce direzionale per simulare il sole
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
  }

  // Aggiunge l'avatar che rappresenta il giocatore nella scena
  private addPlayerAvatar(): void {
    const loader = new FBXLoader();
    loader.load('assets/avatar/Breakdance 2.fbx', (object) => {
      object.scale.set(0.01, 0.01, 0.01); // Scala l'avatar come necessario
      object.position.set(0, 0.5, 0);
      this.playerAvatar = object; // Usa playerAvatar come riferimento all'avatar per il movimento
      this.scene.add(object);

      // Imposta il mixer per le animazioni
      this.mixer = new THREE.AnimationMixer(object);
      if (object.animations.length > 0) {
        const action = this.mixer.clipAction(object.animations[0]);
        action.play();
      }
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.error('An error happened', error);
    });
  }

  // Aggiunge le pareti della stanza, creando una stanza chiusa
  private addRoomWalls(): void {
    const wallGeometry = new THREE.BoxGeometry(20, 5, 0.2);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 }); // Pareti di colore grigio chiaro

    // Crea e posiziona le pareti della stanza (dietro, davanti, sinistra, destra)
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(0, 2.5, -10);
    this.scene.add(backWall);

    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.set(0, 2.5, 10);
    this.scene.add(frontWall);

    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-10, 2.5, 0);
    this.scene.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = Math.PI / 2;
    rightWall.position.set(10, 2.5, 0);
    this.scene.add(rightWall);

    // Crea e posiziona il pavimento della stanza
    const floorGeometry = new THREE.BoxGeometry(20, 0.2, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 }); // Pavimento di colore grigio scuro
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(0, 0, 0);
    this.scene.add(floor);
  }

  // Aggiunge dei quadri alle pareti della stanza e pop up informativo
  private addArtworkFrames(): void {
    const frameGeometry = new THREE.BoxGeometry(3, 2, 0.2);
    const loader = new THREE.TextureLoader();

    // Carica e posiziona i quadri sulle pareti
    for (let i = 0; i < 4; i++) {
      const artworkTexture = loader.load(`assets/img/${i + 1}.jpg`);
      const frameMaterial = new THREE.MeshBasicMaterial({ map: artworkTexture });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);

      // Posiziona i quadri su pareti diverse in base all'indice
      switch (i) {
        case 0: // Parete posteriore
          frame.position.set(-7 + i * 5, 2.5, -9.9);
          break;
        case 1: // Parete destra
          frame.position.set(9.9, 2.5, -5 + i * 5);
          frame.rotation.y = -Math.PI / 2;
          break;
        case 2: // Parete anteriore
          frame.position.set(-7 + (i - 2) * 5, 2.5, 9.9);
          frame.rotation.y = Math.PI;
          break;
        case 3: // Parete sinistra
          frame.position.set(-9.9, 2.5, -5 + (i - 2) * 5);
          frame.rotation.y = Math.PI / 2;
          break;
      }
      frame.userData = {
        isArtwork: true, // Aggiunge un identificatore
        title: `Opera ${i + 1}`,
        description: 'Descrizione dell’opera'
      };
      this.scene.add(frame);
    }
  }

  private checkProximityToFrames(): void {
    const avatarPosition = this.playerAvatar.position;
    this.scene.children.forEach((child: any) => {
      if (child?.userData?.isArtwork) {
        const distance = avatarPosition.distanceTo(child.position);
        (child.material as THREE.MeshBasicMaterial).opacity = distance < 3 ? 1 : 0.5;
      }
    });
  }


  // Aggiunge controlli per permettere all'utente di ruotare e zoomare con il mouse
  private addControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Attiva un piccolo effetto di inerzia durante il movimento
    this.controls.dampingFactor = 0.05; // Imposta il fattore di smorzamento
    this.controls.screenSpacePanning = false; // Limita lo spostamento al solo asse y
    this.controls.minDistance = 5; // Imposta la distanza minima di zoom
    this.controls.maxDistance = 50; // Imposta la distanza massima di zoom
    this.controls.maxPolarAngle = Math.PI / 2; // Impedisce di ruotare la visuale oltre il limite verticale
  }

  // Ciclo di animazione che viene chiamato ripetutamente per aggiornare la scena
  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Calcola il delta del movimento
    const delta = 0.05;
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    // Aggiorna la direzione del movimento in base ai tasti premuti
    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();

    if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 0.1 * delta;
    if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 0.1 * delta;

    // Se esiste una posizione target, muovi l'avatar verso di essa
    if (this.targetPosition) {
      const step = 0.1;
      this.playerAvatar.position.lerp(this.targetPosition, step);
      if (this.playerAvatar.position.distanceTo(this.targetPosition) < 0.1) {
        this.targetPosition = undefined;
      }
    }

    this.playerAvatar.position.add(this.velocity);

    // Limita il movimento dell'avatar entro i confini della stanza
    this.playerAvatar.position.x = Math.max(-9, Math.min(9, this.playerAvatar.position.x));
    this.playerAvatar.position.z = Math.max(-9, Math.min(9, this.playerAvatar.position.z));

    if (this.mixer) {
      this.mixer.update(delta);
    }

    this.controls.update(); // Aggiorna i controlli per abilitare lo zoom e la rotazione
    this.updateMinimap();
    this.checkProximityToFrames();
    this.renderer.render(this.scene, this.camera); // Rende la scena attuale sulla camera
  }


}
