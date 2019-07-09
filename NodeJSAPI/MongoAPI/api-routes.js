
let router = require('express').Router();
let contactController = require('./Controllers/contactController');

router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to MongoAPI crafted with love!',
    });
});

router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

module.exports = router;
