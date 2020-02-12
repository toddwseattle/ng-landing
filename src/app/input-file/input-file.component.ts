import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  forwardRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-input-file",
  templateUrl: "./input-file.component.html",
  styleUrls: ["./input-file.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ]
})
export class InputFileComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean;
  @Input() placeholder: string;
  @Input() valuePlaceholder: string;
  @Input() required: boolean;
  @Input() multiple: boolean;
  focused: boolean;
  fileNames: string;

  private _files: File[];

  @ViewChild("input", { static: false }) rawInput: ElementRef;

  /**
   * https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
   * https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
   */
  constructor() {}

  private _propagateChange = (_: any) => {};
  private _propagateTouched = (_: any) => {};

  writeValue(obj: any): void {
    this.files = obj;
  }
  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get input() {
    return this.rawInput.nativeElement;
  }

  get hasFiles(): boolean {
    return this.files !== undefined && this.files.length > 0;
  }

  get files(): File[] {
    return this._files;
  }

  set files(fileList) {
    let fileArray: File[];
    if (fileList) {
      fileArray = [];
      for (let i = 0; i < fileList.length; i++) {
        fileArray.push(fileList[i]);
      }
      this._propagateChange(fileArray);
    }
    this._files = fileArray;
    this._initFileNames();
  }

  ngOnInit() {
    this.disabled = this.disabled !== undefined ? this.disabled : false;
    this.required = this.required !== undefined ? this.required : false;
    this.multiple = this.multiple !== undefined ? this.multiple : false;
    this.focused = false;
    this._initFileNames();
  }

  onFocusToggle() {
    this.focused = !this.focused;
  }

  onTouched(event) {
    this._propagateTouched(null);
  }

  onChange(event) {
    this.files = this.input.files;
  }

  open() {
    if (!this.disabled) {
      this.input.click();
    }
  }

  private _initFileNames() {
    let str = [this.valuePlaceholder || "Aucun fichier sélectionné"];
    if (this.hasFiles) {
      str = this.files.map(f => f.name);
    }
    this.fileNames = str.join(", ");
  }
}
