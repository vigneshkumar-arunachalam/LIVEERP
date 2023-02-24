!(function (e) {
  
    function t(t) {
        var a;
        try {
            a = e.datepicker.parseDate(dateFormat, t.value);
        } catch (e) {
            a = null;
        }
        return a;
    }
    jQuery(function (e) {
        e(window).on("load", function () {
            e("#overlayer").hide();
        }),
            e("#datepicker,#datepicker2,#datepicker3,#datepicker4,#datepicker5,#datepicker6,#datepicker7").datepicker({ dateFormat: "d MM yy", duration: "medium", changeMonth: !0, changeYear: !0, yearRange: "2021:2010" }),
            e("#datepicker9").datepicker({ dateFormat: "yy-mm-dd", timeFormat: " hh:ii:ss", showWeek: !0 }),
            e("#datepicker8").datepicker({ minDate: -20, maxDate: "+1M +10D" });
    }),
        (from = e('input[name="date-range-from"]')
            .datepicker({
                defaultDate: "+1w",
                changeMonth: !0,
                numberOfMonths: 2,
                onSelect: function () {
                    e("#ui-datepicker-div").addClass("testX");
                },
            })
            .on("change", function () {
                to.datepicker("option", "minDate", t(this));
            })),
        (to = e('input[name="date-range-to"]')
            .datepicker({ defaultDate: "+1w", changeMonth: !0, numberOfMonths: 2 })
            .on("change", function () {
                from.datepicker("option", "maxDate", t(this));
            })),
        e("img.svg").each(function () {
            var t = e(this),
                a = t.attr("id"),
                s = t.attr("class"),
                i = t.attr("src");
            e.get(
                i,
                function (e) {
                    var i = jQuery(e).find("svg");
                    void 0 !== a && (i = i.attr("id", a)), void 0 !== s && (i = i.attr("class", s + " replaced-svg")), (i = i.removeAttr("xmlns:a")), t.replaceWith(i);
                },
                "xml"
            );
        }),
        feather.replace();
    const a = document.querySelector(".sidebar-toggle");
    a &&
        a.addEventListener("click", function (t) {
            t.preventDefault(), e(".overlay-dark-sidebar").toggleClass("show"), document.querySelector(".sidebar").classList.toggle("collapsed"), document.querySelector(".contents").classList.toggle("expanded");
        }),
        e(".sidebar_nav .has-child ul").hide(),
        e(".sidebar_nav .has-child.open ul").show(),
        e(".sidebar_nav .has-child >a").on("click", function (t) {
            t.preventDefault(),
                e(this).parent().next("has-child").slideUp(),
                e(this).parent().parent().children(".has-child").children("ul").slideUp(),
                e(this).parent().parent().children(".has-child").removeClass("open"),
                console.log(e(this).next()),
                e(this).next().is(":visible") ? e(this).parent().removeClass("open") : (e(this).parent().addClass("open"), e(this).next().slideDown());
        }),
        e(window)
            .on("resize", function () {
                window.innerWidth;
                e(this).width() <= 767.98 ? (e(".navbar-right__menu").appendTo(".mobile-author-actions"), e(".contents").addClass("expanded"), e(".sidebar ").addClass("collapsed")) : e(".navbar-right__menu").appendTo(".navbar-right");
            })
            .trigger("resize"),
        e(window)
            .bind("resize", function () {
                window.innerWidth;
                e(this).width() > 767.98 && e(".atbd-mail-sidebar").addClass("show");
            })
            .trigger("resize"),
        e(window)
            .bind("resize", function () {
                window.innerWidth;
                e(this).width() <= 991 &&
                    (e(".sidebar").addClass("collapsed"),
                    e(".sidebar-toggle").on("click", function () {
                        e(".overlay-dark-sidebar").toggleClass("show");
                    }),
                    e(".overlay-dark-sidebar").on("click", function () {
                        console.log(e(this)), e(this).removeClass("show"), e(".sidebar").addClass("collapsed");
                    }));
            })
            .trigger("resize"),
        e(window)
            .bind("resize", function () {
                window.innerWidth;
                e(this).width() <= 991.98 && e(".menu-horizontal").appendTo(".mobile-nav-wrapper");
            })
            .trigger("resize"),
        e(".btn-search").on("click", function () {
            e(this).toggleClass("search-active"), e(".mobile-search").toggleClass("show"), e(".mobile-author-actions").removeClass("show");
        }),
        e(".kanban-items li").hover(function () {
            e(this).toggleClass("active");
        }),
        e(".btn-author-action").on("click", function () {
            e(".mobile-author-actions").toggleClass("show"), e(".mobile-search").removeClass("show"), e(".btn-search").removeClass("search-active");
        }),
        e(".menu-mob-trigger").on("click", function (t) {
            t.preventDefault(), e(".mobile-nav-wrapper").toggleClass("show");
        }),
        e(".nav-close").on("click", function (t) {
            t.preventDefault(), e(".mobile-nav-wrapper").removeClass("show");
        });
    var s = location.hash.replace(/^#/, "");
    s && e('.ap-tab-main a[href="#' + s + '"]').tab("show"),
        e(".ap-tab-main a").on("shown.bs.tab", function (e) {
            window.location.hash = e.target.hash;
        }),
        document.querySelector(".print-btn") &&
            document.querySelector(".print-btn").addEventListener("click", function () {
                var e, t, a;
                (e = ".payment-invoice"), (t = document.body.innerHTML), (a = document.querySelector(e).innerHTML), (document.body.innerHTML = a), window.print(), (document.body.innerHTML = t);
            });
    let l = (e, t) => (void 0 === e ? t : e);
    e(".banner-slider").each(function () {
        e(this).slick({
            slidesToShow: l(e(this).data("slide-slick"), 1),
            slidesToScroll: l(e(this).data("slideScroll-slick"), 1),
            infinite: l(e(this).data("infinity-slick"), !0),
            speed: 300,
            autoplay: l(e(this).data("autoplay-slick"), !1),
            autoplaySpeed: l(e(this).data("autoplaySpeed-slick"), 5e3),
            lazyLoad: l(e(this).data("lazyLoad-slick"), "ondemand"),
            centerMode: l(e(this).data("center-slick"), !1),
            rtl: l(e(this).data("rtl-slick"), !0),
            adaptiveHeight: l(e(this).data("adaptiveHeight-slick"), !1),
            arrows: l(e(this).data("arrow-slick"), !1),
            prevArrow: ["<span class='slick-prev'><i class='la la-angle-left'></i></span>"],
            nextArrow: ["<span class='slick-next'><i class='la la-angle-right'></i></span>"],
            dots: l(e(this).data("dots-slick"), !1),
            fade: l(e(this).data("fade-slick"), !1),
            responsive: l(e(this).data("responsive-slick"), {}),
        });
    }),
        e('a[data-toggle="tab"]').on("shown.bs.tab", function () {
            e(".slick-slider").slick("refresh");
        }),
        e(".dropdown-clickEvent a").on("click", function (t) {
            t.preventDefault();
            const a = `\n            <div class="atbd-notice">\n                <span>${e(this).text()} Clicked</span>\n            </div>\n        `;
            e(".atbd-message").prepend(a),
                e(".atbd-message").toggleClass("show"),
                setTimeout(function () {
                    e(".atbd-message").empty(), e(".atbd-message").removeClass("show");
                }, 3e3);
        }),
        e(".ap-post-gallery").magnificPopup({
            delegate: "a",
            type: "image",
            tLoading: "Loading image #%curr%...",
            mainClass: "mfp-img-mobile",
            gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] },
            image: { tError: '<a href="%url%">The image #%curr%</a> could not be loaded.' },
        }),
        e(".popup-youtube").magnificPopup({ disableOn: 700, type: "iframe", mainClass: "mfp-fade", removalDelay: 160, preloader: !1, fixedContentPos: !1 }),
        e(".friends-follow").on("click", function (t) {
            t.preventDefault(),
                ($button = e(this)),
                $button.hasClass("following") ? ($button.removeClass("following"), $button.removeClass("unfollow"), $button.text("Follow")) : ($button.html('<i class="la la-check"></i> following'), $button.addClass("following"));
        });
    const o = document.querySelector(".ap-post-form"),
        r = document.querySelector(".ap-post-form textarea"),
        n = document.createElement("div");
    n.classList.add("overlay-dark"),
        o &&
            r &&
            r.addEventListener("click", function (e) {
                e.preventDefault(),
                    document.body.appendChild(n),
                    (n.style.opacity = "1"),
                    (n.style.visibility = "visible"),
                    (document.body.style.position = "relative"),
                    setTimeout(function () {
                        o.classList.add("highlighted");
                    }, 300);
            }),
        null !== o &&
            document.body.addEventListener("click", function (e) {
                !e.target.closest(".ap-post-form") &&
                    o.classList.contains("highlighted") &&
                    (document.body.removeChild(n), (n.style.opacity = "0"), (n.style.visibility = "hidden"), document.body.removeAttribute("style"), o.classList.remove("highlighted"));
            }),
        e("#countryOption,#cityOption,#skillsOption,#exampleFormControlSelect1,#select-countryOption").select2({ minimumResultsForSearch: 1 / 0, placeholder: "Please Select", allowClear: !0 }),
        e("#event-category").select2({ minimumResultsForSearch: 1 / 0, placeholder: "Project Category", allowClear: !0 }),
        e("#category-member").select2({ minimumResultsForSearch: 1 / 0, placeholder: "Project Category", dropdownCssClass: "category-member", allowClear: !0 }),
        e("#cupon").select2({ minimumResultsForSearch: 1 / 0, placeholder: "Select Coupon", dropdownCssClass: "cupon", allowClear: !0 }),
        e("#month").select2({ minimumResultsForSearch: 1 / 0, placeholder: "MM", dropdownCssClass: "month", allowClear: !0 }),
        e("#year").select2({ minimumResultsForSearch: 1 / 0, placeholder: "yy", dropdownCssClass: "year", allowClear: !0 }),
        e("#clock").countdown("2021/10/10", function (t) {
            e(this).html(
                t.strftime(
                    '<span class="number">%d<span class="text">days</span></span> <span class="number">%H<span class="text">hours</span></span> <span class="number">%M<span class="text">minutes</span></span> <span class="number">%S<span class="text">seconds</span></span> '
                )
            );
        }),
        e('#customSwitch1, input[name="intervaltype"]').on("click", function () {
            e(".monthly,#monthly").toggleClass("active"), e(".yearly,#yearly").toggleClass("active");
        }),
        e(".toggle-password").click(function () {
            e(this).toggleClass("fa-eye-slash fa-eye");
            var t = e(e(this).attr("toggle"));
            "password" == t.attr("type") ? t.attr("type", "text") : t.attr("type", "password");
        }),
        e(".tag-closable").on("click", function () {
            e(this).parent(".atbd-tag ").remove();
        });
    const d = { gridItemsSelector: ".filtr-item", gutterPixels: 25, spinner: { enabled: !0 }, layout: "sameSize" },
        c = { gridItemsSelector: ".filtr-item--style2", gutterPixels: 25, layout: "sameHeight" };
    if (null !== document.querySelector(".filtr-container")) {
        new Filterizr(".filtr-container", d);
    }
    if (null !== document.querySelector(".filtr-container2")) {
        new Filterizr(".filtr-container2", c);
    }
    const u = document.querySelectorAll(".simplefilter li");
    Array.from(u).forEach((e) =>
        e.addEventListener("click", function () {
            u.forEach((e) => e.classList.remove("active")), e.classList.add("active");
        })
    ),
        e("#ueberTab a").on("click", function (t) {
            for (otherTabs = e(this).attr("data-secondary").split(","), i = 0; i < otherTabs.length; i++)
                (nav = e('<ul class="nav d-none" id="tmpNav"></ul>')), nav.append('<li class="nav-item"><a href="#" data-toggle="tab" data-target="' + otherTabs[i] + '">nav</a></li>"'), nav.find("a").tab("show");
        }),
        e(".rating-basic").starRating({ emptyColor: "#C6D0DC", hoverColor: "#FA8B0C", ratedColor: "#FA8B0C", disableAfterRate: !1, useFullStars: !0, starSize: 12, strokeWidth: 6 }),
        e(".rating-readOnly").starRating({ emptyColor: "#C6D0DC", hoverColor: "#FA8B0C", ratedColor: "#FA8B0C", activeColor: "#FA8B0C", useGradient: !1, initialRating: 2, readOnly: !0, starSize: 12, strokeWidth: 6 }),
        e(".rating-half-star").starRating({ emptyColor: "#C6D0DC", hoverColor: "#FA8B0C", ratedColor: "#FA8B0C", activeColor: "#FA8B0C", initialRating: 2, starSize: 12, strokeWidth: 6 }),
        e(".rater").starRating({
            emptyColor: "#C6D0DC",
            hoverColor: "#FA8B0C",
            ratedColor: "#FA8B0C",
            activeColor: "#FA8B0C",
            useFullStars: !0,
            initialRating: 2,
            starSize: 12,
            strokeWidth: 6,
            disableAfterRate: !1,
            onHover: function (t, a, s) {
                e(".rate-count").text(t);
            },
            onLeave: function (t, a, s) {
                e(".rate-count").text(a);
            },
        }),
        e("[data-countdown]").each(function () {
            e(this).countdown(e(this).data("countdown"), function (t) {
                e(this).html(
                    "<ul>" + t.strftime('<li><span class="statistics-countdown__time">%H</span>:</li><li><span class="statistics-countdown__time">%M</span>:</li><li><span class="statistics-countdown__time">%S</span></li>') + "</ul>"
                );
            });
        }),
        e("#switch-spin").on("change", function () {
            e(this).is(":checked") ? e(".spin-embadded").addClass("spin-active") : e(".spin-embadded").removeClass("spin-active");
        }),
        e(".kb__select-wrapper select,.tagSelect-rtl select").select2({ dir: "rtl", dropdownAutoWidth: !0, dropdownParent: e(".kb__select-wrapper .select2,.tagSelect-rtl .select2") });
    const p = document.querySelector(".upload-one");
    null !== p &&
        p.addEventListener(
            "change",
            function () {
                if (window.File && window.FileList && window.FileReader) {
                    let t = event.target.files,
                        a = e(".atbd-upload__file ul");
                    for (let e = 0; e < t.length; e++) {
                        let s = t[e];
                        if (!s.type.match("image")) continue;
                        let i = new FileReader();
                        i.addEventListener("load", function (e) {
                            e.target;
                            let t = `\n                      <li>\n                        <a href="#" class="file-name"><i class="las la-paperclip"></i> <span class="name-text">${s.name}<span></a>\n                        <a href="#" class="btn-delete"><i class="la la-trash"></i></a>\n                      </li>\n                    `;
                            a.append(t);
                        }),
                            i.readAsDataURL(s);
                    }
                } else console.log("Browser not support");
            },
            !1
        ),
        e("#time-picker,#time-picker2").wickedpicker();
    let m = function (t, a) {
        var s = a.value || 20,
            i = a.handle || e(".ui-slider-handle"),
            l = `<span class="tooltip-text">${s}</span>`;
        e(i).html(l);
    };
    e("#switch-slider").on("change", function () {
        e(this).is(":checked")
            ? (e(".slider-wrapper").addClass("disabled"), e(".slider-basic , .slider-range").slider({ disabled: "true" }))
            : (e(".slider-wrapper").removeClass("disabled"), e(".slider-basic, .slider-range").slider({ disabled: "false" }));
    }),
        e(".slider-basic").slider({ range: "min", min: 0, max: 50, value: 20, slide: m, create: m }),
        e(".slider-range").slider({ range: !0, min: 0, max: 50, values: [15, 30], slide: m, create: m }),
        e("#switch-slider").on("change", function () {
            e(this).is(":checked")
                ? (e(".slider-wrapper").addClass("disabled"), e(".slider-basic , .slider-range").slider({ disabled: "true" }))
                : (e(".slider-wrapper").removeClass("disabled"), e(".slider-basic, .slider-range").slider({ disabled: "false" }));
        });
    const h = document.querySelectorAll(".drawer-trigger"),
        v = document.querySelector(".drawer-basic-wrap"),
        g = document.querySelector(".overlay-dark"),
        f = document.querySelectorAll(".btdrawer-close"),
        w = document.querySelector(".drawer-multiLevel"),
        b = document.querySelector(".area-drawer"),
        y = document.querySelector(".area-overlay");
    function k(e) {
        e.preventDefault(),
            "basic" == this.dataset.drawer
                ? (v.classList.remove("account"), v.classList.remove("profile"), v.classList.add("basic"), v.classList.add("show"), g.classList.add("show"))
                : "area" == this.dataset.drawer
                ? (b.classList.add("show"), y.classList.add("show"))
                : "account" == this.dataset.drawer
                ? (v.classList.remove("basic"), v.classList.remove("profile"), v.classList.add("account"), v.classList.add("show"), g.classList.add("show"))
                : "profile" == this.dataset.drawer && (v.classList.remove("basic"), v.classList.remove("account"), v.classList.add("profile"), v.classList.add("show"), g.classList.add("show"));
    }
    function C() {
        v.classList.remove("show"), g.classList.remove("show"), b.classList.remove("show"), y.classList.remove("show"), w.classList.remove("show");
    }
    h && h.forEach((e) => e.addEventListener("click", k)), g && g.addEventListener("click", C), f && f.forEach((e) => e.addEventListener("click", C)), y && y.addEventListener("click", C);
    let S = document.getElementsByName("radio-placement");
    function L() {
        for (var e = 0; e < S.length; e++)
            if (S[e].checked) {
                "top" == S[e].value
                    ? (v.classList.add("top"), v.classList.remove("right"), v.classList.remove("bottom"), v.classList.remove("left"))
                    : "left" == S[e].value
                    ? (v.classList.add("left"), v.classList.remove("right"), v.classList.remove("bottom"), v.classList.remove("top"))
                    : "bottom" == S[e].value
                    ? (v.classList.add("bottom"), v.classList.remove("right"), v.classList.remove("left"), v.classList.remove("top"))
                    : "right" == S[e].value && (v.classList.add("right"), v.classList.remove("left"), v.classList.remove("bottom"), v.classList.remove("top"));
                break;
            }
    }
    S && S.forEach((e) => e.addEventListener("change", L));
    const T = document.querySelectorAll(".drawer-multiTrigger"),
        x = document.querySelector(".overlay-dark-l2");
    function D() {
        "level-one" == this.dataset.drawer
            ? (w.classList.add("level-one"), w.classList.add("show"), w.classList.remove("level-two"), g.classList.add("show"))
            : "level-two" == this.dataset.drawer && (w.classList.add("level-two"), x.classList.add("show"), w.classList.add("show"));
    }
    function _() {
        e(".upload-avatar-input").on("change", function () {
            !(function (t) {
                if (t.files && t.files[0]) {
                    let a = new FileReader();
                    (a.onload = function (t) {
                        e(".avatrSrc").attr("src", t.target.result);
                    }),
                        a.readAsDataURL(t.files[0]);
                }
            })(this);
        });
    }
    var F, A;
    x &&
        x.addEventListener("click", function () {
            w.classList.remove("level-two"), x.classList.remove("show");
        }),
        T && T.forEach((e) => e.addEventListener("click", D)),
        e(".atbd-upload-avatar").on("click", function (t) {
            t.preventDefault(), _(), e(".upload-avatar-input").click();
        }),
        (F = ".menu-collapsable .atbd-menu__link"),
        e(".menu-wrapper .menu-collapsable " + (A = ".atbd-submenu")).slideUp(),
        e(".menu-wrapper " + F).on("click", function (t) {
            e(this).parent().hasClass("has-submenu") && t.preventDefault(), e(this).toggleClass("open").siblings(A).slideToggle().parent().siblings(".sub-menu").children(A).slideUp().siblings(F).removeClass("open");
        }),
        e("#select-component").select2({ minimumResultsForSearch: 1 / 0 }),
        e("#id_label_single").select2({ placeholder: "All", dropdownCssClass: "category-member", allowClear: !0 }),
        e("#select-search,.kb__select").select2({ placeholder: "Search a person", dropdownCssClass: "category-member", allowClear: !0 }),
        e("#select-alerts2").select2({ placeholder: "Alerts", dropdownCssClass: "alert2", allowClear: !0 }),
        e("#select-option2").select2({ placeholder: "Select an option...", dropdownCssClass: "option2", allowClear: !0 }),
        e("#select-tag,#select-tag2").select2({ placeholder: "Tags Mode", dropdownCssClass: "tag", tags: ["red", "green", "blue"], allowClear: !0 }),
        e("#mail-message, #mail-reply-message").trumbowyg({
            btnsDef: { image: { dropdown: ["insertImage", "base64"], ico: "insertImage" } },
            btns: [
                ["viewHTML"],
                ["formatting"],
                ["strong", "em", "del"],
                ["superscript", "subscript"],
                ["link"],
                ["image"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
                ["unorderedList", "orderedList"],
                ["horizontalRule"],
                ["removeformat"],
                ["fullscreen"],
            ],
        }),
        e("#mail-reply-message2,#mail-reply-message3").trumbowyg({
            btns: [
                ["formatting", "strong", "em", "superscript", "subscript", "link"],
                ["unorderedList", "orderedList"],
            ],
        }),
        e("#mail-to,#reply-to,#reply-to2").select2({ placeholder: "", dropdownCssClass: "mail-to" }),
        e(".mailbar-toggle").on("click", function () {
            e(".atbd-mail-sidebar").toggleClass("show");
        }),
        e(".mailbar-cross").on("click", function (t) {
            t.preventDefault(), e(".atbd-mail-sidebar").removeClass("show");
        }),
        e(".like-icon").click(function () {
            e(this).find(".icon").toggleClass("lar"), e(this).find(".icon").toggleClass("las");
        }),
        e(".ap-button .follow").click(function () {
            e(this).find(".follow-icon").toggleClass("la-user-plus"), e(this).find(".follow-icon").toggleClass("la-user-check"), e(this).toggleClass("active");
        }),
        e(".price-slider").slider({
            range: !0,
            min: 0,
            max: 3e3,
            values: [0, 2e3],
            slide: function (t, a) {
                e(".price-value").text("$" + a.values[0] + " - $" + a.values[1]);
            },
        }),
        e(".price-value").text("$" + e(".price-slider").slider("values", 0) + " - $" + e(".price-slider").slider("values", 1)),
        e(".text-limit p span").text(function (e, t) {
            return t.substr(0, 34);
        }),
        e("#myCarouselArticle").carousel({ interval: !1 }),
        e(document).on("click", ".qty-plus", function () {
            e(this)
                .prev()
                .val(+e(this).prev().val() + 1);
        }),
        e(document).on("click", ".qty-minus", function () {
            e(this).next().val() > 0 &&
                e(this)
                    .next()
                    .val(+e(this).next().val() - 1);
        }),
        e(".fc-listMonth-button").on("click", function () {
            console.log(e(".fc-listMonth-button"));
            const t = document.querySelectorAll(".fc-list-table");
            console.log(t);
        }),
        e(".open-popup-modal").each(function (t, a) {
            e(a).on("click", function () {
                e(this).siblings(".popup-overlay").fadeIn("slow").addClass("active"), e(this).siblings(".popup-overlay").children(".popup-content").fadeIn("slow").addClass("active"), e("body").fadeIn("slow").addClass("is-open");
            });
        }),
        e("body").on("click", function (t) {
            t.target.closest(".open-popup-modal, .popup-content") || (e(".popup-overlay, .popup-content").fadeIn("slow").removeClass("active"), e("body").fadeIn("slow").removeClass("is-open"));
        }),
        window.addEventListener(
            "keydown",
            function (t) {
                ("Escape" != t.key && "Esc" != t.key && 27 != t.keyCode) || "BODY" != t.target.nodeName || (e(".popup-overlay, .popup-content").fadeIn("slow").removeClass("active"), e("body").fadeIn("slow").removeClass("is-open"));
            },
            !0
        ),
        e('.bd-example-indeterminate [type="checkbox"]').prop("indeterminate", !0),
        e(".sidebar").mCustomScrollbar({ theme: "minimal-dark", setTop: -100, scrollInertia: 150 });
    const E = document.querySelector(".sidebar_nav li a.active");
    if (null !== E) {
        const e = E.offsetTop;
        document.querySelector(".mCSB_container").style.top = e + "px";
    }
    const q = document.querySelector(".btn-compose"),
        M = document.querySelector(".btn-add-label"),
        R = document.querySelector(".atbd-mailCompose"),
        z = document.querySelector(".add-lebel-from"),
        O = document.querySelector(".compose-close"),
        B = document.querySelector(".label-close");
    function I(t) {
        t.preventDefault(), "label" == this.dataset.trigger ? z.classList.add("show") : "compose" == this.dataset.trigger && R.classList.add("show"), e(t.target).hasClass("label-close") && z.classList.remove("show");
    }
    function Q(e) {
        e.preventDefault(), "label" == this.dataset.trigger ? z.classList.remove("show") : "compose" == this.dataset.trigger && R.classList.remove("show");
    }
    null !== q && null !== O && (q.addEventListener("click", I), M.addEventListener("click", I)), null !== O && null !== B && (O.addEventListener("click", Q), B.addEventListener("click", Q));
    let H = moment().subtract(6, "days"),
        P = moment();
    e('input[name="date-ranger"]').daterangepicker({
        singleDatePicker: !1,
        startDate: H,
        endDate: P,
        autoUpdateInput: !1,
        ranges: {
            Today: [moment(), moment()],
            Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
        },
    }),
        jQuery('<div class="pt_QuantityNav"><div class="pt_QuantityButton pt_QuantityUp"><i class="las la-angle-up"></i></div><div class="pt_QuantityButton pt_QuantityDown"><i class="las la-angle-down"></i></div></div>').insertAfter(
            ".pt_Quantity input"
        ),
        jQuery(".pt_Quantity").each(function () {
            var e = jQuery(this),
                t = e.find('input[type="number"]'),
                a = e.find(".pt_QuantityUp"),
                s = e.find(".pt_QuantityDown"),
                i = t.attr("min"),
                l = t.attr("max");
            t.val(),
                a.on("click", function () {
                    var a = parseFloat(t.val());
                    if (a >= l) var s = a;
                    else s = a + 1;
                    e.find("input").val(s), e.find("input").trigger("change");
                }),
                s.on("click", function () {
                    var a = parseFloat(t.val());
                    if (a <= i) var s = a;
                    else s = a - 1;
                    e.find("input").val(s), e.find("input").trigger("change");
                });
        }),
        e(".line").peity("line", { fill: !1, height: 100, width: 400 }),
        e(".area-line").peity("line", { height: 100, width: 400 }),
        e('[data-toggle="tooltip"]').tooltip(),
        e(".createModal #new-member").modal("show"),
        e(".breadcrumb-modal3 #add-contact").modal("show");
    const $ = document.querySelectorAll("[data-layout]");
    function j(t) {
        t.preventDefault(),
            "light" === this.dataset.layout
                ? (e("ul.l_sidebar li a,.l_sidebar a").removeClass("active"), e(this).addClass("active"), e("body").removeClass("layout-dark"), e("body").addClass("layout-light"))
                : "dark" === this.dataset.layout
                ? (e("ul.l_sidebar li a,.l_sidebar a").removeClass("active"), e(this).addClass("active"), e("body").removeClass("layout-light"), e("body").addClass("layout-dark"))
                : "side" === this.dataset.layout
                ? (e("ul.l_navbar li a,.l_navbar a").removeClass("active"), e(this).addClass("active"), e("body").removeClass("top-menu"), e("body").addClass("side-menu"))
                : "top" === this.dataset.layout && (e("ul.l_navbar li a,.l_navbar a").removeClass("active"), e(this).addClass("active"), e("body").removeClass("side-menu"), e("body").addClass("top-menu"));
    }
    $ && ($.forEach((e) => e.addEventListener("click", j)), $.forEach((e) => e.addEventListener("click", G)));
    const W = document.querySelector(".customizer-trigger"),
        U = document.querySelector(".customizer-wrapper"),
        N = document.querySelector(".customizer-close"),
        Y = document.querySelector(".customizer-overlay");
    function G(e) {
        e.preventDefault(), U.classList.remove("show"), W.classList.remove("show"), Y.classList.remove("show");
    }
    function X(t, a, s) {
        var i, l;
        try {
            (l = e.datepicker.parseDate(s, t)), e.datepicker.parseDate(s, a) < l && ((i = t), (t = a), (a = i));
        } catch (e) {}
        return { start: t, end: a };
    }
    W &&
        W.addEventListener("click", function (t) {
            t.preventDefault(), this.classList.toggle("show"), U.classList.toggle("show"), e(".customizer-overlay").addClass("show");
        }),
        N && Y && (N.addEventListener("click", G), Y.addEventListener("click", G)),
        e(".search-toggle").on("click", function (t) {
            t.preventDefault(), e(this).toggleClass("active"), e(".search-form-topMenu").toggleClass("show");
        }),
        e(".date-picker__calendar").datepicker(),
        e(".sales-target__progress-bar").each(function () {
            var t = e(this).find(".bar"),
                a = e(this).find("span"),
                s = parseInt(a.text(), 10),
                i = (e(".right"), e(".back"));
            e({ p: 0 })
                .animate(
                    { p: s },
                    {
                        duration: 3e3,
                        step: function (e) {
                            t.css({ transform: "rotate(" + (45 + 1.8 * e) + "deg)" }), a.text(0 | e);
                        },
                    }
                )
                .delay(200),
                100 == s && i.delay(2600).animate({ top: "18px" }, 200),
                0 == s && e(".left").css("background", "gray");
        }),
        e(".testimonial-slider1").slick({
            rtl: !0,
            dots: !0,
            infinite: !0,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: !0,
            centerPadding: 30,
            centerPadding: 0,
            prevArrow: '<div class="slider-arrow slider-prev las la-arrow-left"></div>',
            nextArrow: '<div class="slider-arrow slider-next las la-arrow-right"></div>',
            responsive: [
                { breakpoint: 1499, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: !0, centerMode: !1, dots: !0 } },
                { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ],
        }),
        e(".testimonial-slider2").slick({
            rtl: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: '<div class="slider-arrow slider-prev las la-arrow-left"></div>',
            nextArrow: '<div class="slider-arrow slider-next las la-arrow-right"></div>',
            responsive: [
                { breakpoint: 1499, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: !0, centerMode: !1, dots: !0 } },
                { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ],
        }),
        e(".testimonial-slider3-for").slick({ rtl: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, fade: !0, infinite: !0, asNavFor: ".testimonial-slider3-nav", arrows: !1 }),
        e(".testimonial-slider3-nav").slick({
            rtl: !0,
            dots: !1,
            infinite: !0,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: !0,
            asNavFor: ".testimonial-slider3-for",
            lazyLoad: "progressive",
            swipe: !0,
            focusOnSelect: !0,
            cssEase: "linear",
            touchMove: !0,
            arrows: !1,
            responsive: [
                { breakpoint: 1899, settings: { slidesToShow: 3, slidesToScroll: 1, centerMode: !1, dots: !0 } },
                { breakpoint: 1600, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            ],
        }),
        e(".testimonial-slider4").slick({
            rtl: !0,
            dots: !1,
            infinite: !0,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<div class="slider-arrow slider-prev las la-arrow-left"></div>',
            nextArrow: '<div class="slider-arrow slider-next las la-arrow-right"></div>',
        }),
        (e.fn.dateRangePicker = function (t) {
            t = e.extend({ changeMonth: !1, changeYear: !1, numberOfMonths: 2, rangeSeparator: " - ", useHiddenAltFields: !1 }, t || {});
            var a,
                s = e(this),
                i = t.onSelect || e.noop,
                l = t.onClose || e.noop,
                o = t.beforeShow || e.noop,
                r = t.beforeShowDay;
            function n(s, i) {
                var l, o;
                (s = s.split(t.rangeSeparator)).length > 0 ? ((l = e.datepicker.parseDate(i, s[0])), s.length > 1 && (o = e.datepicker.parseDate(i, s[1])), (a = { start: l, end: o })) : (a = null);
            }
            return (
                (t.beforeShow = function (t, a) {
                    var i = s.datepicker("option", "dateFormat");
                    n(e(t).val(), i), o.apply(s, arguments);
                }),
                (t.beforeShowDay = function (e) {
                    var t,
                        i = [!0, ""];
                    return a && a.start <= e && a.end && e <= a.end && (i[1] = "ui-datepicker-range"), r && ((t = r.apply(s, arguments)), (i[0] = i[0] && t[0]), (i[1] = i[1] + " " + t[1]), (i[2] = t[2])), i;
                }),
                (t.onSelect = function (a, l) {
                    var o;
                    if (l.rangeStart) {
                        if (((l.inline = !1), (o = l.rangeStart) !== a)) {
                            var r = s.datepicker("option", "dateFormat"),
                                n = X(o, a, r);
                            if ((s.val(n.start + t.rangeSeparator + n.end), (l.rangeStart = null), t.useHiddenAltFields)) {
                                var d = s.attr("data-to-field"),
                                    c = s.attr("data-from-field");
                                e("#" + c).val(n.start), e("#" + d).val(n.end);
                            }
                        }
                    } else (l.inline = !0), (l.rangeStart = a);
                    i.apply(s, arguments);
                }),
                (t.onClose = function (e, t) {
                    (t.rangeStart = null), (t.inline = !1), l.apply(s, arguments);
                }),
                this.each(function () {
                    s.is("input") && s.datepicker(t), s.wrap('<div class="dateRangeWrapper"></div>');
                })
            );
        }),
        e(document).ready(function () {
            e("#txtDateRange").dateRangePicker({ showOn: "focus", rangeSeparator: " - ", dateFormat: "dd/mm/yy", useHiddenAltFields: !0, constrainInput: !0 });
        }),
        e(window).on("load", function () {
            e(".loader-overlay").delay(500).fadeOut("slow"),
                e("#overlayer").fadeOut(500, function () {
                    e("body").removeClass("overlayScroll");
                });
        });
})(jQuery);
