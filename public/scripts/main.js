"use strict";

function graficos() {
    var e = {
        labels: ["January", "February", "March"],
        datasets: [{
            label: "Lorem Isum dolor",
            backgroundColor: "#c2cbdf",
            data: [4, 2, 3]
        }, {
            label: "Lorem Isum dolor",
            backgroundColor: "#9aa1af",
            data: [1, 2, 3]
        }, {
            label: "Lorem Isum dolor",
            backgroundColor: "#54bbab",
            data: [1, 2, 3]
        }]
    };
    window.onload = function() {
        var a = document.getElementById("canvas").getContext("2d");
        window.myBar = new Chart(a, {
            type: "bar",
            data: e,
            options: {
                title: {
                    display: !0
                },
                tooltips: {
                    mode: "index",
                    intersect: !1
                },
                responsive: !0,
                legend: {
                    position: "right"
                },
                scales: {
                    xAxes: [{
                        stacked: !0
                    }],
                    yAxes: [{
                        stacked: !1
                    }]
                }
            }
        })
    }
}

function acoesMenuLateral() {
    $("aside .menu li a").click(function() {
        var e = $(this),
            a = e.parent();
        if ($("ul", a).length) {
            var o = $("ul", a).eq(0);
            return o.is(":visible") ? (o.slideUp(), a.removeClass("ativo")) : (o.slideDown(), a.addClass("ativo").siblings("li").removeClass("ativo").children("ul").slideUp()), !1
        }
    })
}

function acoesMenuPrincipal() {
    $("header ul li.item-pesquisa a").click(function() {
        $(this).parent().addClass("ativo"), $("header div.pesquisa").show(), $("#overlay").show()
    }), $("header ul li.item-calendario a").click(function() {
        $(this).parent().addClass("ativo"), $("header div.calendario").show(), $("#overlay").show()
    }), $("header ul li.item-config a").click(function() {
        $(this).parent().addClass("ativo"), $("header div.config").show(), $("#overlay").show()
    }), $("#overlay").click(function() {
        $("header div.sub-item").hide(), $(this).hide(), $("header ul li").removeClass("ativo")
    })
}
$("#calendario, #calendarioHeader").datepicker({
    dateFormat: "dd/mm/yy",
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    nextText: "Próximo",
    prevText: "Anterior"
}), acoesMenuPrincipal(), acoesMenuLateral(), graficos();

$(document).ready(function() {
    $('.datatable').DataTable();
} );