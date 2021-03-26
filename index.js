const express = require('express');
const faker = require('faker')
const bodyParser = require('body-parser')
const app = express();

// list users
const users = []

for (let i = 0; i < 10; i++) {
    users.push({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email()
    })
}
// Créer la version de notre api
const versionApi = '/api/v1';

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
//GET /api/v1/users

app.get(`${versionApi}/users`, (req, res) => {
    res.json({
        data: users
    })
});

// GET users/:id

app.get(`${versionApi}/users/:id`, (req, res) => {
    const id = req.params.id - 1

    res.json({
        data: users[id] || null
    })
})

// POST
app.post(`${versionApi}/users`, (req, res) => {
    const data = req.body.data
// exclure tout les mails n'appartenant pas a plop.com
    console.log('la data', data);
    if (!data.email) {
        res.status(422).json({
            error: 'Il faut un email',
            code: 422
        });
    } else {
        if (!data.email.includes('@')) {
            res.status(422).json({
                error: 'votre email est pas valide',
                code: 1422
            });
            return;
        }
        users.push(data);
        res.json({
        index: users.length,
        data: users[users.length - 1]
     })
    }
})

// PUT
app.put(`${versionApi}/users/:id`, (req, res) => {
    const id = req.params.id - 1
    const data = req.body
    users[id] = Object.assign(users[id], data)
    res.json({
        data: users[id]
    })
})

// DELETE
app.delete(`${versionApi}/users/:id`, (req, res) => {
    const id = req.params.id - 1

    users.splice(id, 1)

    res.sendStatus(200)
})
app.listen(3000, () => console.log('Listening on port 3000'));