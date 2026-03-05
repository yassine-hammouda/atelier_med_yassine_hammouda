import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Atelier } from '../models/atelier';
import { AtelierService } from '../services/atelier.service'; // AJOUTÉ

@Component({
  selector: 'app-gestion-atelier',
  templateUrl: './gestion-atelier.component.html'
})
export class GestionAtelierComponent implements OnInit {
  infoEtudiant: string = "Med Yassine Hammouda";
  atelierForm: FormGroup;
  listeAteliers: Atelier[] = [];
  isEditMode: boolean = false;
  currentId: string | null = null;

  constructor(private fb: FormBuilder, private atelierService: AtelierService) {
    this.atelierForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(5)]],
      gmailFormateur: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@gmail\\.com$")]],
      nbParticipant: [16, [Validators.required, Validators.min(16)]],
      statut: [true]
    });
  }

  ngOnInit(): void {
    this.chargerAteliers();
  }

  chargerAteliers() {
    this.atelierService.getAteliers().subscribe(data => {
      this.listeAteliers = data;
    });
  }

  valider() {
    if (this.atelierForm.valid) {
      if (this.isEditMode && this.currentId) {
        this.atelierService.updateAtelier(this.currentId, this.atelierForm.value).subscribe(() => {
          this.chargerAteliers();
          this.resetForm();
        });
      } else {
        this.atelierService.createAtelier(this.atelierForm.value).subscribe(() => {
          this.chargerAteliers();
          this.resetForm();
        });
      }
    }
  }

  supprimer(id: string) {
    this.atelierService.deleteAtelier(id).subscribe(() => {
      this.chargerAteliers();
    });
  }

  modifier(atelier: Atelier) {
    this.isEditMode = true;
    this.currentId = atelier.id;
    this.atelierForm.patchValue(atelier);
  }

  resetForm() {
    this.isEditMode = false;
    this.currentId = null;
    this.atelierForm.reset({ statut: true, nbParticipant: 16 });
  }
}