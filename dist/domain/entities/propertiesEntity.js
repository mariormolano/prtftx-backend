"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Properties = void 0;
const enums_1 = require("@domain/enums");
const typeorm_1 = require("typeorm");
const typesEntity_1 = require("./typesEntity");
let Properties = class Properties {
  id;
  name;
  typeValue;
  value;
  createdAt;
  types;
};
exports.Properties = Properties;
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", String)],
  Properties.prototype,
  "id",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String),
  ],
  Properties.prototype,
  "name",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String),
  ],
  Properties.prototype,
  "typeValue",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "enum",
      enum: enums_1.valueEnum,
      default: enums_1.valueEnum.TEXT,
    }),
    __metadata("design:type", String),
  ],
  Properties.prototype,
  "value",
  void 0
);
__decorate(
  [(0, typeorm_1.CreateDateColumn)(), __metadata("design:type", Date)],
  Properties.prototype,
  "createdAt",
  void 0
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(
      () => typesEntity_1.Types,
      (type) => type.properties,
      { onDelete: "CASCADE" }
    ),
    __metadata("design:type", typesEntity_1.Types),
  ],
  Properties.prototype,
  "types",
  void 0
);
exports.Properties = Properties = __decorate(
  [(0, typeorm_1.Entity)("properties")],
  Properties
);
