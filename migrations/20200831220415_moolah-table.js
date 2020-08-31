
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl=> {
        tbl.increments('id')
        tbl.string('email_address').unique().notNullable()
        tbl.string('username').unique().notNullable()
        tbl.string('password').notNullable()
        tbl.string('nickname')
        tbl.integer('salary')
        tbl.timestamp('created_at').defaultTo(knex.fn.now())

    })
    .createTable('needs', tbl=> {
        tbl.increments('id')
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
        tbl.string('need_name')
        tbl.integer('need_amount')
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
        tbl.integer('label_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('labels')
    })
    .createTable('wants', tbl=> {
        tbl.increments('id')
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
        tbl.string('want_name')
        tbl.integer('want_amount')
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
        tbl.integer('label_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('labels')
    })
    .createTable('investments', tbl=> {
        tbl.increments('id')
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
        tbl.string('investment_name')
        tbl.integer('investment_amount')
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
        tbl.integer('label_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('labels')
    })
    .createTable('labels', tbl=> {
        tbl.increments('id')
        tbl.string('label_name').unique()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users', 'needs', 'wants', 'investments', 'labels');
};
