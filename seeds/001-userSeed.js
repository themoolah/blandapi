
exports.seed = function(knex) {
  // Deletes ALL existing entries
  
    knex('users').del(),
    knex('wants').del(),
    knex('needs').del(),
    knex('investments').del(),
    knex('labels').del()

    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id:1, email_address: "test@gmail.com", username: "jetli", password: "12345624", nickname: "nick", salary: 200000},
        {id:2, email_address: "test2@gmail.com", username: "vundie", password: "125624", nickname: "sadboi", salary: 134200000}
      ])
    }).then(function() {
      return knex('needs').insert([
        {id: 4, need_name: "rent", need_amount: 50000, user_id:1, label_id:1},
        {id: 3, need_name: "food", need_amount: 5000, user_id:2, label_id:2},
      ])
    })
    .then(function() {
      return knex('wants').insert([
        {id: 1, want_name: "Netflix", want_amount: 50000, user_id:1, label_id:1},
        {id: 2, want_name: "Bags", want_amount: 5000, user_id:2, label_id:3},
      ])
      
    })
    .then(function(){
      return knex('investments').insert([
        {id: 1, investment_name: "Stonks", investment_amount: 100000, user_id:1, label_id:5},
        {id: 2, investment_name: "Forex", investment_amount: 60000, user_id:2, label_id:4},
      ])
      
    }).then(function(){
      return knex('labels').insert([
        {id: 1, label_name: "Food"},
        {id: 2, label_name: "Transportation"},
        {id: 3, label_name: "Mutual Funds"},
        {id: 4, label_name: "Entertainment"},
        {id: 5, label_name: "Black tax"},
      ]);
    });
};
