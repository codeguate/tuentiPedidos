$(document).ready(function () {

    function getTextWidth(txt) {
        var $elm = $('<span class="tempforSize">' + txt + '</span>').prependTo("body");
        var elmWidth = $elm.width();
        $elm.remove();
        return elmWidth;
    }

    function centerSelect($elm) {
        var optionWidth = getTextWidth($elm.children(":selected").html())
        var emptySpace = $elm.width() - optionWidth;
        $elm.css("text-indent", (emptySpace / 2) - 10); // -10 for some browers to remove the right toggle control width
    }
    // on start 
    $('.elegirpack').each(function () {
        if (document.width < 1200) {
            centerSelect($(this));
        }
    });
    // on change
    $('.elegirpack').on('change', function () {
        if (document.width < 1200) {
            centerSelect($(this));
        }
    });

    $('#departamento').on('change', function () {
        console.log('sdfas');
        var depar = $('#departamento').val();
        if (depar == 'Guatemala') {
            $('.guatemala_option').text('Guatemala');
            $('#departamento').attr('style', 'color: #333 !important');
            console.log(this);
            return true;
        }
        if (depar == "null_departamento") {
            var allError = "Seleccione un departamento.<br/>";
            $("#modal_error").html(allError);
            $('#myModal').modal('show');
            $(".submit_form").removeAttr("disabled");
            $('#ss-form')[0].reset();
            return false;
        }

        if (depar == "null_otros") {
            var allError = "Seleccione un departamento.<br/>";
            $("#modal_error").html(allError);
            $('#myModal').modal('show');
            $(".submit_form").removeAttr("disabled");
            $('#ss-form')[0].reset();
            return false;
        }

        if (depar != "Guatemala") {
            var allError = "El servicio no está disponible para tu departamento todavía.<br/>";
            $("#modal_error").html(allError);
            $('#myModal').modal('show');
            $(".submit_form").removeAttr("disabled");
            $('#ss-form')[0].reset();


            var dataPost_departamento = {
                "departamento": depar
            };
            var dataString = JSON.stringify(dataPost_departamento);
            $.ajax({
                url: 'post_departamento.php',
                type: 'POST',
                async: false,
                data: {
                    myData: dataString
                },
                success: function (data) {
                    text_validation = data;
                    console.log(text_validation.length);
                }
            })
        }
    });

    $('.document_responsive').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        onInit: function () {
            $('.slick-active').prev().addClass('prev');
            $('.slick-active').next().addClass('next');
        },

        onBeforeChange: function () {
            $('.slick-slide').removeClass('prev next');
        },

        onAfterChange: function () {
            $('.slick-active').prev().addClass('prev');
            $('.slick-active').next().addClass('next');
        }
    });
});

var conditionBTN = false;
var submitted = false;

function enableForm() {
    conditionBTN = true;
}

var globalcontidion = true;

function validateForm(e) {
    e.preventDefault();
    $(".submit_form").attr("disabled", true);
    $(".submit_form").css('display', 'none');

    var celular = document.getElementById("cel").value;
    var nombre = document.getElementById("name").value;
    var departamento = document.getElementById("departamento").value;
    var allError = "";
    var text_validation = false;

    var output = $("#dpi").val();
    var resultdpi = false;
    var tam_dpi = output.length;

    var form = ((2 * parseInt(output[0])) + (3 * parseInt(output[1])) + (4 * parseInt(output[2])) + (5 * parseInt(output[
            3])) + (6 * parseInt(output[4])) + (7 * parseInt(output[5])) + (8 * parseInt(output[6])) + (9 * parseInt(output[7]))) %
        11;

    if (form === parseInt(output[8])) {
        resultdpi = false;
    } else {
        resultdpi = true;
    }

    if (nombre == "") {
        allError += "El campo de Nombre es obligatorio.<br/>";
        $("#modal_error").html(allError);
        $('#myModal').modal('show');
        $(".submit_form").fadeIn(100);
        $(".submit_form").attr("disabled", false);
        return false; //true
    }

    if (celular == "") {
        allError += "El campo de Teléfono es obligatorio.<br/>";
        $("#modal_error").html(allError);
        $('#myModal').modal('show');
        $(".submit_form").fadeIn(100);
        $(".submit_form").attr("disabled", false);
        return false; //true
    }

    if (tam_dpi == "") {
        allError += "El campo DPI es obligatorio.<br/>";
        $("#modal_error").html(allError);
        $('#myModal').modal('show');
        $(".submit_form").fadeIn(100);
        $(".submit_form").attr("disabled", false);
        return false; //true
    }

    if (departamento == "null") {
        allError += "El campo de Departamento es obligatorio.<br/>";
        $("#modal_error").html(allError);
        $('#myModal').modal('show');
        $(".submit_form").fadeIn(100);
        $(".submit_form").attr("disabled", false);
        return false; //true
    }

    if (tam_dpi != 13) {
        allError += "El DPI debe de contener 13 digitos.<br/>";
        $("#modal_error").html(allError);
        $('#myModal').modal('show');
        $(".submit_form").fadeIn(100);
        $(".submit_form").attr("disabled", false);
        return false; //true
    }


    if (resultdpi) {
        allError += "El DPI no es valido.<br/>";
        $("#modal_error").html(allError);
        $('#myModal').modal('show');
        $(".submit_form").fadeIn(100);
        $(".submit_form").attr("disabled", false);
        return false; //true
    }

    if (departamento == "otros") {
        allError += "Lamentablemente no contamos con el servicio en tu departamento aún.<br/>";
        $("#modal_error").html(allError);
        $('#myModal').modal('show');
        $(".submit_form").fadeIn(100);
        $(".submit_form").attr("disabled", false);
        return false; //true
    }

    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 5; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    console.log('codigo: ' + result);
    $("#id_pedido").val(result);

    if (allError == "") {
        if (globalcontidion) {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var track = url.searchParams.get("track_id");
            var json = {
                dpi: output,
                pedido: result
            };
            var dataPost = {
                "dpi": output,
                "pedido": result,
                "nombre": nombre,
                "celular": celular
            };
            var dataString = JSON.stringify(dataPost);
            var text_validation;
            $.ajax({
                url: 'get_user_dpi.php',
                type: 'POST',
                async: false,
                data: {
                    myData: dataString
                },
                success: function (data) {
                    text_validation = data;
                }
            })

            if (text_validation.length == 25) {

                allError += "Solo se permite un pedido por DPI.<br/>";
                $("#modal_error").html(allError);
                $('#myModal').modal('show');
                $(".submit_form").fadeIn(100);
                $(".submit_form").attr("disabled", false);
                return false; //true
            }

            var url_string = window.location.href;
            var url = new URL(url_string);
            var utm_source = url.searchParams.get("utm_source");

            $("#id_afiliado").val(utm_source);


            if (utm_source == null) {
                $("#id_afiliado").val('Organico');
            }

            var re =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;


            var celular = celular;
            var intcelular = parseInt(celular);
            $("#cel").val(intcelular);

            submitted = true;
            setTimeout(function () {
                onLoadNextStep();
            }, 1000)
            return true;
        }
    }
}

function onLoadNextStep() {
    var result = $('#id_pedido').val();
    var result2 = $('#id_afiliado').val();
    window.location = 'https://pedituchip.tuenti.gt/ty/paso3.php?uniqid=' + result + '&id_afiliado=' + result2 + '';
}
https://docs.google.com/forms/u/1/d/e/1FAIpQLScn81apzwNCmR7vei9fbBrH8E8I8Y4-mrvJKywFvMKcpN3luA/formResponse