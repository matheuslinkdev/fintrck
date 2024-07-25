export const apiGuide = ()=>{
    return(
        `<h1>fntrck API guide</h1>
        <h3>Here you can see the API Methods</h3>

        <ul>
            <li>"/dash" - You can GET all the transactions, and POST a single transaction</li>
            <li>"/dash/entries" - You can GET all the entries list</li>
            <li>"/dash/expenses" - You can GET all the expenses list</li>
            <li>"/dash/transaction/:id" - You can GET details of a specific transaction, edit it with PUT or DELETE</li>
            <li>"/dash/important" - You can GET the important transactions list</li>
            <li>"/reminders" - You can GET a list of all the reminders that you added or either POST one reminder</li>
            <li>"/reminders/:id" - You can GET data of a single reminder, edit it with PUT and also DELETE it</li>
        </ul>
        `
    )
}