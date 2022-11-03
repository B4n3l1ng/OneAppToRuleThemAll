# Project2_One_App_To_Rule_Them_All
A simple backend SSR web application built using ES6, node.js, HTTP, express, ejs, mongoose, cookies and session & auth.
Click here to see deployed application: INSERT LINK HERE

## Description
One App To Rule Them All is a simple web application allowing the user to access, explore and enjoy the world of Middle Earth. Once authenticated, the user will be able to maintain a profile through which a number of activities can be carried out. The user will be able to create a library of personalised characters, updating and deleting these as desired. They will also be able to explore the world further, buy inventory in the shop and earn money in the form of Castar coins.

## MVP (2 Models, 1 Relationship, CRUD, Auth)
# Sign Up 
- form with username, email and password

# Log In
- form with username and password

# Profile
- links to all additional pages
- background detail and central image
- icons surrounding central images to act as buttons

# Characters List
- library of all characters listed from DB ==> READ
- link to add new character to DB ==> CREATE
- each listed character should be a link that can be selected to take user to Character Details

# Character Details
- all object properties and values listed
- character image shown
- links to update or delete character ==> UPDATE & DELETE

# Shop
- available items listed with prices and images
- link to allow user to buy item, sending it to inventory DB ==> CREATE

# Money/Earn Money
- lists available money
- link to add money

# Inventory
- additional collection, model and schema
- lists all purchased items as a library with info and image ==> READ
- link to sell item which increase money available ==> DELETE

# Explore World
- additional collection, model and schema
- lists all major areas and info about them ==> READ

## Backlog
# API
- use for the explore world function?

# Additional design features
- hover button features
- animation of some kind?

# Shop
- sound effects
- item descriptions

# Easter Eggs
- TBD

## Data structure
# login.ejs
- form
- nav bar
- styling

# signup.ejs
- form
- nav bar
- styling

# profile.ejs
- nav bar
- styling
- links as icons

# layout.ejs
- nav bar
- styling 

# characters.ejs
- characters listed as library
- styling
- characters as links
- create character link

# character-details.ejs
- update character link
- delete character link
- styling
- character details listed
- character image shown

# shop.ejs
- styling
- items listed with price and image
- purchase links

# money.ejs
- current amount
- styling
- link to earn money 

# inventory.ejs
- styling
- items purchased listed with image
- links to sell item to increase money 

# world.ejs
- styling
- all places listed as library 
- links to see place details

## Task
[] login.ejs - form
[] login.ejs - nav bar
[] login.ejs - styling
[] signup.ejs - form
[] signup.ejs - nav bar
[] signup.ejs - styling
[] profile.ejs - nav bar
[] profile.ejs - styling
[] profile.ejs - links as icons
[] layout.ejs - nav bar
[] layout.ejs - styling
[] characters.ejs - characters listed as library
[] characters.ejs - styling
[] characters.ejs - characters as links
[] characters.ejs - create character link
[] character-details.ejs - update character link
[] character-details.ejs - delete character link
[] character-details.ejs - styling
[] character-details.ejs - character details listed
[] character-details.ejs - character image shown
[] shop.ejs - styling
[] shop.ejs - items listed with price and image
[] shop.ejs - purchase links
[] money.ejs - current amount
[] money.ejs - styling
[] money.ejs - link to earn money
[] inventory.ejs - styling
[] inventory.ejs - items purchased listed with image
[] inventory.ejs - links to sell item to increase money
[] world.ejs - styling
[] world.ejs - all places listed as library
[] world.ejs - links to see place details
[X] config - session config
[] routes - character routes
[X] routes - auth routes
[X] .env
[] models - user model
[] models - character model
[] models - shop model
[] models - world model
[] models - inventory model
[X] logout

## Links
Trello - https://trello.com/b/nSV8ho0j/project-2
GitHub - https://github.com/B4n3l1ng/OneAppToRuleThemAll
Slides - https://docs.google.com/presentation/d/1ol4Fh5LV5pmmtLXIFrS300f-j6tiI59abDop2s5Z9GY/edit#slide=id.p