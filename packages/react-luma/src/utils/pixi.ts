import * as PIXI from "pixi.js";

class ReactLumaLayoutTransform extends PIXI.Transform {
  updateTransform(parentTransform: PIXI.Transform) {
    if (this._localID !== this._currentLocalID) {
      this.localTransform.a = this._cx * this.scale.x;
      this.localTransform.b = this._sx * this.scale.x;
      this.localTransform.c = this._cy * this.scale.y;
      this.localTransform.d = this._sy * this.scale.y;

      this.localTransform.tx =
        this.position.x -
        (this.pivot.x * this.localTransform.a +
          this.pivot.y * this.localTransform.c);

      this.localTransform.ty =
        this.position.y -
        (this.pivot.x * this.localTransform.b +
          this.pivot.y * this.localTransform.d);

      this._currentLocalID = this._localID;
      this._parentID = -1;
    }

    if (this._parentID !== parentTransform._worldID) {
      this.worldTransform.a = this.localTransform.a;
      this.worldTransform.b = this.localTransform.b;
      this.worldTransform.c = this.localTransform.c;
      this.worldTransform.d = this.localTransform.d;

      this.worldTransform.tx =
        this.localTransform.tx + parentTransform.worldTransform.tx;
      this.worldTransform.ty =
        this.localTransform.ty + parentTransform.worldTransform.ty;

      this._parentID = parentTransform._worldID;

      this._worldID += 1;
    }
  }
}

export function patchLayoutTransform(displayObject: PIXI.DisplayObject) {
  if (displayObject.transform instanceof ReactLumaLayoutTransform) {
    return;
  }
  displayObject.transform = new ReactLumaLayoutTransform();
}
