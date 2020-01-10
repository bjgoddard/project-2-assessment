const express = require('express');
const methodOverride = require('method-override');
const app = express();
let db = require('./models')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////

//GET
app.get('/', (req, res) => {
    db.widget.findAll()
    .then(widgets => {
    res.render('index', { widgets })
    }) 
})

app.post('/', (req, res) => {
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then(() => {
        res.redirect('/')
    })
})

app.delete('/', (req, res) => {
    db.widget.destroy({
        where: {id: req.body.widgetdelete}
    })
    .then(() => {
        res.redirect('/')
    })
})
//DELETE
// router.delete('/:id', isLoggedIn, (req, res) => {
//     db.teams.findOne({
//         where: { id : req.params.id },
//         include: [db.members]
//     })
//     .then(() => {
//         db.members.destroy({ 
//             where: { id: req.body.memberName }  
//         })
//     })
//         .then(() => {
//             res.redirect(`/profile/${req.params.id}`)
//         })
//     })




// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
