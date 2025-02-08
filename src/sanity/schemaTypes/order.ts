


export default {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name",
        },
        {
            name: "email",
            type: "string",
            title: "Email",
        },
        {
            name: "phone",
            type: "string",
            title: "Phone",
        },
        {
            name: "cartdiscount",
            type: "number",
            title: "CartDiscount",
        },
        {
            name: "address",
            type: "string",
            title: "Address",
        },
        {
            name : 'city',
            type : 'string',
            title : 'City'
        },
        {
            name : 'cartItems',
            type : 'array',
            title : 'Cart Items',
            of : [{type : 'reference', to : [{type : 'products'}]}]
        },      
        {
            name: 'total',
            type: 'number',
            title: 'Total'
        },
        {
            name:'status',
            type:'string',
            title:'Status',
            options : {
                list : [{title:'Pending', value: 'pending'},
                {title:'Dispatch', value: 'dispatch'},
                {title:'Success', value: 'Success'}
                ],

                layout : 'radio'},
                initialValue : 'pending'
        }
    ]
}