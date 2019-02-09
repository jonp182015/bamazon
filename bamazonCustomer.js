var mysql = require("mysql");
var inquirer = require("inquirer");
var c = require('./db.js');

var connection = mysql.createConnection(c);

connection.connect(function (err) {
    if (err) throw err;
    displayItems();
    purchaseItem();
});

function displayItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\nID| PRODUCT NAME | PRICE ")
        console.log('---------------------------')
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | $" + results[i].price);
        }
        console.log('---------------------------\n')
    });
}

function purchaseItem() {
    connection.query('SELECT * FROM bamazonDB.products', function (error, results) {
        if (error) throw error;
        inquirer
            .prompt([
                {
                    name: 'itemId',
                    type: 'input',
                    message: 'Please, enter the product Id of the item you would like to buy.',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: 'quantity',
                    type: 'input',
                    message: 'How many units would you like to buy?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(answers => {
                var quantity = parseInt(answers.quantity);
                var productId = parseInt(answers.itemId);

                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === productId) {
                        chosenItem = results[i];
                    }
                }
                if (chosenItem.stock_quantity >= quantity) {
                    connection.query('UPDATE bamazonDB.products SET ? WHERE ?', [
                        {
                            stock_quantity: chosenItem.stock_quantity - quantity,  
                        },
                        {
                            item_id: chosenItem.item_id,
                        }
                    ], function (error, results) {
                        if (error) throw error;
                    });
                    console.log('\n-------------------');
                    console.log('\nawsome!\n\nYou are about to purchase ' + quantity + ' ' + '"' + chosenItem.product_name + '"' + '\n\n' + 'Your total is: $' + 
                    parseFloat(chosenItem.price * quantity).toFixed(2) + '\n');
                    console.log('---------------------');
                } else {
                    console.log('\nInsufficient quantity!\n');
                }
                connection.end();
            });
    });
}
