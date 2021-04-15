const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "handlebars");

const hbs = exphbs.create({});

hbs.handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
    return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  },
});

app.use(express.static("public/assets"));
app.use(express.static(path.join(__dirname, "public"), { index: "_" }));
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
