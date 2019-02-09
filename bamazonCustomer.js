var mysql = require("mysql");
var inquirer = require("inquirer");
var c = require('./db.js');

var connection = mysql.createConnection(c);

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    displayItems();
    purchaseItem();
    //connection.end();
});

function displayItems() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //console.log(results);

        console.log("\nID| PRODUCT NAME | PRICE ")
        console.log('---------------------------')
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | $" + results[i].price);
        }
        console.log('---------------------------\n')
        //purchaseItem();
        //connection.end();


        /*
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "itmesForSale",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_name);
                        }
                        console.log('')
                        return choiceArray;
                    },
                    message: "What auction would you like to place a bid in?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How much would you like to bid?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                // determine if bid was high enough
                if (chosenItem.highest_bid < parseInt(answer.bid)) {
                    // bid was high enough, so update db, let the user know, and start over
                    connection.query(
                        "UPDATE auctions SET ? WHERE ?",
                        [
                            {
                                highest_bid: answer.bid
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Bid placed successfully!");
                            start();
                        }
                    );
                }
                else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Your bid was too low. Try again...");
                    start();
                }
            });
        */
    });
}

function purchaseItem() {
    connection.query('SELECT * FROM bamazonDB.products', function (error, results) {
        if (error) throw error;
        //console.log(results);
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
