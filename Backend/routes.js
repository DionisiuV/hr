//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

//Import Employee Controller
var employeeController = require('./employeeController');

// Employee routes
router.route('/employee')
    .get(employeeController.index)
    .post(employeeController.add);

router.route('/employee/:employee_id')
    .get(employeeController.view)
    .put(employeeController.update)
    .delete(employeeController.delete);

//Export API routes
module.exports = router;