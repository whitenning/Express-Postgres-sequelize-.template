import sequelize from "../db.js";
import { DataTypes, Sequelize } from "sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true, required: true },
  email: { type: DataTypes.STRING, unique: true, required: true },
  password: { type: DataTypes.STRING, required: true },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" }
});
const Cart = sequelize.define(
  "cart",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
  },
  { timestamps: false }
);

const Product = sequelize.define(
  "product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
  },
  { timestamps: false }
);

const Keyboard = sequelize.define(
  "keyboard",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    inStock: { type: DataTypes.INTEGER, defaultValue: 0 },
    handle: { type: DataTypes.TEXT, required: true },
    title: { type: DataTypes.STRING, unique: true, required: true },
    vendor: { type: DataTypes.STRING, defaultValue: "НЕ ЗАДАНО" }
  },
  { timestamps: false }
);

const Image = sequelize.define("image", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  position: { type: DataTypes.INTEGER, defaultValue: 0 },
  alt: { type: DataTypes.STRING, defaultValue: "НЕ ЗАДАНО" },
  src: { type: DataTypes.STRING, required: true }
});
const Option = sequelize.define(
  "option",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, defaultValue: "НЕ ЗАДАНО", required: true },
    value: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    position: { type: DataTypes.INTEGER, defaultValue: 1 }
  },
  { timestamps: false }
);

const Variant = sequelize.define(
  "variant",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    compare_at_price: { type: DataTypes.INTEGER, defaultValue: 0 },
    fulfillment_service: { type: DataTypes.STRING, defaultValue: "manual" },
    grams: { type: DataTypes.INTEGER, defaultValue: 0 },
    requires_shipping: { type: DataTypes.BOOLEAN, defaultValue: false },
    price: { type: DataTypes.INTEGER, defaultValue: 0 }
  },
  { timestamps: false }
);

const Spec = sequelize.define(
  "spec",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    layout: { type: DataTypes.INTEGER, defaultValue: 0 },
    weight: { type: DataTypes.INTEGER, defaultValue: 0 },
    weight_unit: { type: DataTypes.STRING, defaultValue: "kg" },
    structure: { type: DataTypes.STRING, defaultValue: "НЕ ЗАДАНО" },
    angle: { type: DataTypes.INTEGER, defaultValue: 0 },
    compatibility: { type: DataTypes.STRING, defaultValue: "НЕ ЗАДАНО" },
    size: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    }
  },
  { timestamps: false }
);
// MODELS END
// MODEL RELATIONS START //

// USER RELATIONS START //
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(Product);
Product.belongsTo(Cart);
// USER RELATIONS END //

// KEYBOARD RELATIONS START //
Product.hasMany(Keyboard);
Keyboard.belongsTo(Product);

Keyboard.hasMany(Option);
Option.belongsTo(Keyboard);

Keyboard.hasOne(Spec);
Spec.belongsTo(Keyboard);

Keyboard.hasOne(Variant);
Variant.belongsTo(Keyboard);

Keyboard.hasMany(Image);
Image.belongsTo(Keyboard);
// KEYBOARD RELATIONS END //

// MODEL RELATIONS END //
export { Keyboard, Spec, Option, Variant, User, Cart, Image };
