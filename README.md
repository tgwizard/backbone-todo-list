# Backbone todo-list

This is a small proof-of-concept application, a simple todo-list. It is
a single page application implemented using:

 - [Backbone.js](http://backbonejs.org/)
 - [RequireJS](http://requirejs.org/)
 - [Tictail UIKit](https://tictail.com/developers/documentation/uikit/) (based on [Boostrap](http://getbootstrap.com/))
 - [jQuery UI Sortable](http://jqueryui.com/sortable/)
 - [Flask]()
 - [MongoDB](http://www.mongodb.org/) (using the [PyMongo](http://api.mongodb.org/python/current/) driver)
 - [Gunicorn](http://gunicorn.org/)

A demo is hosted on [Heroku](https://www.heroku.com/): http://tgwizard-todolist.herokuapp.com/

## Local setup

For Mac OS X, Linux should be similar.

``` bash
brew install python
brew install mongodb
virtualenv venv
pip install -r requirements.txt

# Terminal A
mongod

# Terminal B
python app.py # Best for development
# or
gunicorn app:app --error-logfile -
# or
foreman start
```

## Known caveats

 - Drag and drop to reorder list items doesn't work on touch devices.
 - Reorder doesn't work correctly on Heroku since none of the available MongoDB providers ([MongoHQ](https://www.mongohq.com/), [MongoLab](https://mongolab.com) or [MongoSoup](https://www.mongosoup.de/)) support MongoDB version greater than 2.4.X, and this app makes use the `$position` operator introduced in 2.6: http://docs.mongodb.org/manual/reference/operator/update/position/
