

$(document).ready(function () {
    getProduct();
});
function SaveProduct() {
    if (sessionStorage.getItem("id") !=null) {
        //alert("Hello")
        var url = "/api/Product/" + sessionStorage.getItem("id");
        var objectProduct = {};
        objectProduct.Name = $('#txtProductName').val();
        objectProduct.Price = $('#txtProductPrice').val();
        objectProduct.Quantity = $('#txtProductQuantity').val();
        objectProduct.Active = 1;
        if (objectProduct) {
            $.ajax({
                url: url,
                contentType: "application/json; charset=urf-8",
                dataType: "json",
                data: JSON.stringify(objectProduct),
                type: "Put",
                success: function (result) {
                    Clear();
                    sessionStorage.removeItem("id");
                    alert(result);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
        

    }
    else{
        var url = "/api/Product";
        var objectProduct = {};
        objectProduct.Name = $('#txtProductName').val();
        objectProduct.Price = $('#txtProductPrice').val();
        objectProduct.Quantity = $('#txtProductQuantity').val();
        objectProduct.Active = 1;
        if (objectProduct) {
            $.ajax({
                url: url,
                contentType: "application/json; charset=urf-8",
                dataType: "json",
                data: JSON.stringify(objectProduct),
                type: "Post",
                success: function (result) {
                    Clear();
                    alert(result);
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }
    }
    
}
function Clear() {
    $('#txtProductName').val();
    $('#txtProductPrice').val();
    $('#txtProductQuantity').val();
    
}

function getProduct() {
    var url = "/api/Product";
    $.ajax({
        url: url,
        contentType: "application/json; charset=urf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            //alert(JSON.stringify(result));
            if (result) {
                var row = '';
                for (let i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + result[i].Name + "</td>"
                        + "<td>" + result[i].Price + "</td>"
                        + "<td>" + result[i].Quantity + "</td>"
                        + "<td>" + result[i].Active + "</td>"
                        + "<td> <button class='btn btn-primary' onclick='deleteProduct(" + result[i].Id + ")'>Delete</button></td>"
                        + "<td> <button class='btn btn-primary' onclick='updateProduct(" + result[i].Id + ")'>Edit</button></td>"
                        + "</tr>"
                }
                if (row != '') {
                    $('#tblProductBody').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function deleteProduct(id) {
    var url = "/api/Product/" + id;
    $.ajax({
        url: url,
        contentType: "application/json; charset=urf-8",
        dataType: "json",
        type: "Delete",
        success: function (result) {
            Clear();
            alert(result);
            getProduct();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function updateProduct(id) {
    var url = "/api/Product/" + id;
    $.ajax({
        url: url,
        contentType: "application/json; charset=urf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            //alert(result.Id);
            sessionStorage.setItem("id", result.Id )
            $('#txtProductName').val(result.Name);
            $('#txtProductPrice').val(result.Price);
            $('#txtProductQuantity').val(result.Quantity);
        },
        error: function (msg) {
            alert(msg);
        }
    });
}