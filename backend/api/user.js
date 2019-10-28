const bcrypt = require('bcrypt-nodejs')


module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }

        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false
        
        try {
            existsOrError(user.name, 'Name required')
            existsOrError(user.email, 'Email required')
            existsOrError(user.password, 'Password required')
            existsOrError(user.confirmPassword, 'Password Confirmation required')
            equalsOrError(user.password, user.confirmPassword, 'Passwords do not match')
            
            const userFromDb = await app.db('users')
                                        .where({ email: user.email })
                                        .first()
            
            if(!user.id){
                notExistsOrError(userFromDb, 'User already exists!')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(msg))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }


    const get = (req, res) => {
        app.db('users')
            .select('id','name','email','admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id','name','email','admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        //does not remove with articles still referenced
        try {
            const articles = await app.db('articles')
                                        .where({ userId: req.params.id })
            notExistsOrError(articles, 'User owns articles! Delete them first')

            const rowsUpdated = await app.db('users')
                                            .update({ deletedAt: new Date() })
                                            .where({ id : req.params.id })
            existsOrError(rowsUpdated, 'User not found!')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}