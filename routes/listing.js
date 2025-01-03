const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudCongfig.js");
const upload = multer({storage});

const listingController = require("../controller/listing.js");

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);
  
router.route("/")
.get(wrapAsync(listingController.index))
 .post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createLisitng)
);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));
  
  //Edit Route
  router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
  
  module.exports = router;