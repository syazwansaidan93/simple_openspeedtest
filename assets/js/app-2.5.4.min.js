// This function runs when the window has finished loading.
window.onload = function() {
    // Get the template element for the UI.
    var X = document.getElementById("OpenSpeedTest-UI");
    // Replace the template with its content, effectively "un-templating" the UI.
    X.parentNode.replaceChild(X.contentDocument.documentElement, X);
    // Call a function that should exist in the UI's content.
    ostOnload();
    // Start the main OpenSpeedTest application.
    OpenSpeedTest.Start();
};

// Define the main OpenSpeedTest object within the global window scope.
(function(X) {
    // A utility function to get a DOM element by its ID.
    function h(c) {
        if (!(this instanceof h)) return new h(c);
        this.el = document.getElementById(c);
    }

    var m, Ma, Na = function(c) {
        c && "function" === typeof c && c();
    };
    // Adds a fading effect to an element.
    h.prototype.fade = function(c, d, a) {
        var f = "in" === c,
            t = f ? 0 : 1,
            w = 14 / d,
            n = this;
        f && (n.el.style.display = "block", n.el.style.opacity = t);
        var q = window.setInterval(function() {
            t = f ? t + w : t - w;
            n.el.style.opacity = t;
            0 >= t && (n.el.style.display = "none");
            (0 >= t || 1 <= t) && window.clearInterval(q, Na(a));
        }, 14);
    };
    // Function for non-linear animation.
    var Oa = function(c, d, a, f) {
        c /= f;
        c--;
        return a * (c * c * c + 1) + d;
    },
    // Main UI controller class. It initializes all the UI elements.
    r = function() {
        this.YourIP = h("YourIP");
        this.ipDesk = h("ipDesk");
        this.ipMob = h("ipMob");
        this.downSymbolDesk = h("downSymbolDesk");
        this.upSymbolDesk = h("upSymbolDesk");
        this.upSymbolMob = h("upSymbolMob");
        this.downSymbolMob = h("downSymbolMob");
        this.settingsMob = h("settingsMob");
        this.settingsDesk = h("settingsDesk");
        this.oDoLiveStatus = h("oDoLiveStatus");
        this.ConnectErrorMob = h("ConnectErrorMob");
        this.ConnectErrorDesk = h("ConnectErrorDesk");
        this.downResult = h("downResult");
        this.upRestxt = h("upRestxt");
        this.pingResult = h("pingResult");
        this.jitterDesk = h("jitterDesk");
        this.pingMobres = h("pingMobres");
        this.JitterResultMon = h("JitterResultMon");
        this.JitterResultms = h("JitterResultms");
        this.UI_Desk = h("UI-Desk");
        this.UI_Mob = h("UI-Mob");
        this.oDoTopSpeed = h("oDoTopSpeed");
        this.startButtonMob = h("startButtonMob");
        this.startButtonDesk = h("startButtonDesk");
        this.intro_Desk = h("intro-Desk");
        this.intro_Mob = h("intro-Mob");
        this.loader = h("loading_app");
        this.OpenSpeedtest = h("OpenSpeedtest");
        this.mainGaugebg_Desk = h("mainGaugebg-Desk");
        this.mainGaugeBlue_Desk = h("mainGaugeBlue-Desk");
        this.mainGaugeWhite_Desk = h("mainGaugeWhite-Desk");
        this.mainGaugebg_Mob = h("mainGaugebg-Mob");
        this.mainGaugeBlue_Mob = h("mainGaugeBlue-Mob");
        this.mainGaugeWhite_Mob = h("mainGaugeWhite-Mob");
        this.oDoLiveSpeed = h("oDoLiveSpeed");
        this.progressStatus_Mob = h("progressStatus-Mob");
        this.progressStatus_Desk = h("progressStatus-Desk");
        this.graphc1 = h("graphc1");
        this.graphc2 = h("graphc2");
        this.graphMob2 = h("graphMob2");
        this.graphMob1 = h("graphMob1");
        this.text = h("text");
        this.scale = [{
            degree: 680,
            value: .5
        }, {
            degree: 570,
            value: 1
        }, {
            degree: 460,
            value: 10
        }, {
            degree: 337,
            value: 100
        }, {
            degree: 220,
            value: 500
        }, {
            degree: 115,
            value: 1E3
        }, {
            degree: 0,
            value: 1E3
        }];
        this.polygon = this.chart = this.element = "";
        this.width = 200;
        this.height = 50;
        this.maxValue = 0;
        this.values = [];
        this.points = [];
        this.vSteps = 5;
        this.measurements = [];
        this.points = [];
    };
    // Resets the graph and measurement data.
    r.prototype.reset = function() {
        this.polygon = this.chart = this.element = "";
        this.width = 200;
        this.height = 50;
        this.maxValue = 0;
        this.values = [];
        this.points = [];
        this.vSteps = 5;
        this.measurements = [];
        this.points = [];
    };
    // Toggles the visibility of the IP address elements.
    r.prototype.ip = function() {
        "block" === this.ipDesk.el.style.display ? (this.ipDesk.el.style.display = "none", this.ipMob.el.style.display = "none") : (this.ipDesk.el.style.display = "block", this.ipMob.el.style.display = "block");
    };
    // Fades out the loader and shows the app.
    r.prototype.prePing = function() {
        this.loader.fade("out", 500);
        this.OpenSpeedtest.fade("in", 1E3);
    };
    // App initialization, fades out the loader.
    r.prototype.app = function() {
        this.loader.fade("out", 500, this.ShowAppIntro());
    };
    // Shows the app introduction screen.
    r.prototype.ShowAppIntro = function() {
        this.OpenSpeedtest.fade("in", 1E3);
    };
    // Hides the introduction and shows the main UI.
    r.prototype.userInterface = function() {
        this.intro_Desk.fade("out", 1E3);
        this.intro_Mob.fade("out", 1E3, this.ShowUI());
    };
    // Shows the main UI and logs a message.
    r.prototype.ShowUI = function() {
        this.UI_Desk.fade("in", 1E3);
        this.UI_Mob.fade("in", 1E3, function(c) {
            m = "Loaded";
        });
    };
    // Toggles the download/upload symbols.
    r.prototype.Symbol = function(c) {
        0 == c && (this.downSymbolMob.el.style.display = "block", this.downSymbolDesk.el.style.display = "block", this.upSymbolMob.el.style.display = "none", this.upSymbolDesk.el.style.display = "none");
        1 == c && (this.downSymbolMob.el.style.display = "none", this.downSymbolDesk.el.style.display = "none", this.upSymbolMob.el.style.display = "block", this.upSymbolDesk.el.style.display = "block");
        2 == c && (this.downSymbolMob.el.style.display = "none", this.downSymbolDesk.el.style.display = "none", this.upSymbolMob.el.style.display = "none", this.upSymbolDesk.el.style.display = "none");
    };
    // Updates the graph with new speed values.
    r.prototype.Graph = function(c, d) {
        function a(q, M) {
            for (n = f.maxValue = 0; n < f.values.length; n++) f.values[n] > f.maxValue && (f.maxValue = f.values[n]);
            f.maxValue = Math.ceil(f.maxValue);
            if (1 < f.values.length) {
                var F = "0," + f.height + " ";
                for (n = 0; n < f.values.length; n++) {
                    var Q = f.values[n] / f.maxValue;
                    Q = (130 / (f.values.length - 1) * n).toFixed(2) + "," + (f.height - f.height * Q).toFixed(2) + " ";
                    F += Q;
                }
                F += "130," + f.height;
                f.points = F;
            }
            for (n = 0; n < f.vSteps; n++) f.measurements.push(Math.ceil(f.maxValue / f.vSteps * (n + 1)));
            f.measurements.reverse();
            for (F = document.getElementsByClassName(w); 0 < F.length;) F[0].remove();
            f.polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            f.polygon.setAttribute("points", f.points);
            f.polygon.setAttribute("class", w);
            1 < f.values.length && t.appendChild(f.polygon);
        }
        "remove" in Element.prototype || (Element.prototype.remove = function() {
            this.parentNode && this.parentNode.removeChild(this);
        });
        var f = this;
        if (0 === d) {
            var t = this.graphc1.el;
            var w = "line";
            this.graphMob2.el.style.display = "none";
            this.graphMob1.el.style.display = "block";
        } else t = this.graphc2.el, w = "line2", this.graphMob1.el.style.display = "none", this.graphMob2.el.style.display = "block";
        isNaN(c) ? this.values.push("") : this.values.push(c);
        var n;
        0 < c && a(t, c);
    };
    // Animates the progress circle.
    r.prototype.progress = function(c, d) {
        var a = this,
            f = Date.now(),
            t = setInterval(function() {
                var w = (Date.now() - f) / 1E3,
                    n = Oa(w, 400, 400, d),
                    q = Oa(w, 400, -400, d);
                c ? (a.progressStatus_Desk.el.style.strokeDashoffset = n, a.progressStatus_Mob.el.style.strokeDashoffset = n) : (a.progressStatus_Desk.el.style.strokeDashoffset = q, a.progressStatus_Mob.el.style.strokeDashoffset = q);
                w >= d && (clearInterval(t), Ma = "done", a.progressStatus_Desk.el.style.strokeDashoffset = 800, a.progressStatus_Mob.el.style.strokeDashoffset = 800);
            }, 14);
    };
    // Updates the main speedometer gauge.
    r.prototype.mainGaugeProgress = function(c) {
        var d = c;
        0 > d && (d = 0);
        var a = this.getNonlinearDegree(d);
        0 < c && (this.mainGaugeBlue_Desk.el.style.strokeOpacity = 1, this.mainGaugeWhite_Desk.el.style.strokeOpacity = 1, this.mainGaugeBlue_Mob.el.style.strokeOpacity = 1, this.mainGaugeWhite_Mob.el.style.strokeOpacity = 1, this.mainGaugeBlue_Desk.el.style.strokeDashoffset = a, this.mainGaugeWhite_Desk.el.style.strokeDashoffset = 0 == a ? 1 : a + 1, this.mainGaugeBlue_Mob.el.style.strokeDashoffset = a, this.mainGaugeWhite_Mob.el.style.strokeDashoffset = 0 == a ? 1 : a + 1);
        0 == a && 1E3 < d ? (this.mainGaugeBlue_Mob.el.style.strokeDashoffset = 681 <= a ? 681 : a, this.mainGaugeWhite_Mob.el.style.strokeDashoffset = 0 == a ? 1 : a + 1, this.mainGaugeWhite_Desk.el.style.strokeDashoffset = .1, this.mainGaugeBlue_Desk.el.style.strokeDashoffset = 681 <= a ? 681 : a) : 0 == a && 0 >= d && (this.mainGaugeBlue_Mob.el.style.strokeDashoffset = 681.1, this.mainGaugeWhite_Mob.el.style.strokeDashoffset = .1, this.mainGaugeWhite_Desk.el.style.strokeDashoffset = .1, this.mainGaugeBlue_Desk.el.style.strokeDashoffset = 681.1);
    };
    // Displays the current status message.
    r.prototype.showStatus = function(c) {
        this.oDoLiveStatus.el.textContent = c;
    };
    // Shows a connection error message.
    r.prototype.ConnectionError = function() {
        this.ConnectErrorMob.el.style.display = "block";
        this.ConnectErrorDesk.el.style.display = "block";
    };
    // Displays the final upload result.
    r.prototype.uploadResult = function(c) {
        1 > c && (this.upRestxt.el.textContent = c.toFixed(3));
        1 <= c && 9999 > c && (this.upRestxt.el.textContent = c.toFixed(1));
        1E4 <= c && 99999 > c && (this.upRestxt.el.textContent = c.toFixed(1), this.upRestxt.el.style.fontSize = "20px");
        1E5 <= c && (this.upRestxt.el.textContent = c.toFixed(1), this.upRestxt.el.style.fontSize = "18px");
    };
    // Displays the ping results.
    r.prototype.pingResults = function(c, d) {
        var a = c;
        "Ping" === d && (1 <= a && 1E4 > a ? (this.pingResult.el.textContent = Math.floor(a), this.pingMobres.el.textContent = Math.floor(a)) : 0 <= a && 1 > a && (0 == a && (a = 0), this.pingResult.el.textContent = a, this.pingMobres.el.textContent = a));
        "Error" === d && (this.oDoLiveSpeed.el.textContent = a);
    };
    // Displays the final download result.
    r.prototype.downloadResult = function(c) {
        1 > c && (this.downResult.el.textContent = c.toFixed(3));
        1 <= c && 9999 > c && (this.downResult.el.textContent = c.toFixed(1));
        1E4 <= c && 99999 > c && (this.downResult.el.textContent = c.toFixed(1), this.downResult.el.style.fontSize = "20px");
        1E5 <= c && (this.downResult.el.style.fontSize = "18px", this.downResult.el.textContent = c.toFixed(1));
    };
    // Displays the jitter results.
    r.prototype.jitterResult = function(c, d) {
        var a = c;
        "Jitter" === d && (1 <= a && 1E4 > a ? (this.jitterDesk.el.textContent = Math.floor(a), 1 <= a && 100 > a && (this.JitterResultMon.el.textContent = Math.floor(a)), 100 <= a && (a = (a / 1E3).toFixed(1), this.JitterResultMon.el.textContent = a + "k")) : 0 <= a && 1 > a && (0 == a && (a = 0), this.jitterDesk.el.textContent = a, this.JitterResultMon.el.textContent = a));
    };
    // Displays the live speed on the gauge.
    r.prototype.LiveSpeed = function(c, d) {
        var a = c;
        if ("countDown" === d) {
            var f = a.toFixed(0);
            this.oDoLiveSpeed.el.textContent = f;
        } else "speedToZero" === d ? ("number" == typeof a && (a = a.toFixed(1)), 0 >= a && (a = 0), this.oDoLiveSpeed.el.textContent = a, this.oDoTopSpeed.el.textContent = "1000+", this.oDoTopSpeed.el.style.fontSize = "16.9px", this.oDoTopSpeed.el.style.fill = "gray") : "Ping" === d ? 1 <= a && 1E4 > a ? this.oDoLiveSpeed.el.textContent = Math.floor(a) : 0 <= a && 1 > a && (0 == a && (a = 0), this.oDoLiveSpeed.el.textContent = a) : (0 == a && (f = a.toFixed(0), this.oDoLiveSpeed.el.textContent = f), 1 >= a && 0 < a && (f = a.toFixed(3), this.oDoLiveSpeed.el.textContent = f), 1 < a && (f = a.toFixed(1), this.oDoLiveSpeed.el.textContent = f), 1E3 >= a && (this.oDoTopSpeed.el.textContent = "1000+", this.oDoTopSpeed.el.style.fontSize = "16.9px", this.oDoTopSpeed.el.style.fill = "gray"), 1010 <= a && (this.oDoTopSpeed.el.textContent = 1E3 * Math.floor(a / 1010) + "+", this.oDoTopSpeed.el.style.fill = "gray", this.oDoTopSpeed.el.style.fontSize = "17.2px"));
    };
    // Animates the gauge progress back to zero.
    r.prototype.GaugeProgresstoZero = function(c, d) {
        var a = this;
        if (0 <= c) var f = Date.now(),
            t = 0 - c,
            w = setInterval(function() {
                var n = (Date.now() - f) / 1E3;
                var q = n / 3;
                q--;
                q = t * (q * q * q * q * q + 1) + c;
                a.LiveSpeed(q, "speedToZero");
                a.mainGaugeProgress(q);
                if (3 <= n || 0 >= q) clearInterval(w), a.LiveSpeed(0, "speedToZero"), a.mainGaugeProgress(0), m = d;
            }, 16);
    };
    // Maps a speed value to a non-linear degree for the gauge.
    r.prototype.getNonlinearDegree = function(c) {
        var d = 0;
        if (0 == c || 0 >= c || isNaN(c)) return 0;
        for (; d < this.scale.length;)
            if (c > this.scale[d].value) d++;
            else return this.scale[d - 1].degree + (c - this.scale[d - 1].value) * (this.scale[d].degree - this.scale[d - 1].degree) / (this.scale[d].value - this.scale[d - 1].value);
        return this.scale[this.scale.length - 1].degree;
    };
    // A helper class for managing performance, data, and events.
    var O = function() {
        this.OverAllTimeAvg = window.performance.now();
        this.SpeedSamples = [];
        this.FinalSpeed;
    };
    // Resets the helper class.
    O.prototype.reset = function() {
        this.OverAllTimeAvg = window.performance.now();
        this.SpeedSamples = [];
        this.FinalSpeed = 0;
    };
    // Calculates the sum of an array.
    O.prototype.ArraySum = function(c) {
        return c ? c.reduce(function(d, a) {
            if ("number" === typeof d && "number" === typeof a) return d + a;
        }, 0) : 0;
    };
    // Calculates the average speed.
    O.prototype.AvgSpeed = function(c, d, a) {
        this.timeNow = (window.performance.now() - this.OverAllTimeAvg) / 1E3;
        this.FinalSpeed;
        this.timeNow >= a - d && (0 < c && this.SpeedSamples.push(c), this.FinalSpeed = this.ArraySum(this.SpeedSamples) / this.SpeedSamples.length);
        return this.FinalSpeed;
    };
    // Generates a random data blob for upload testing.
    O.prototype.uRandom = function(c, d) {
        for (var a = new Uint32Array(262144), f = [], t = Blob, w = 0; w < c; w++) {
            for (var n = w, q = a.length, M = 0; M < q; M++) a[M] = 4294967296 * Math.random();
            f[n] = a;
        }
        return new t(f, {
            type: "application/octet-stream"
        }, Na(d));
    };
    // Adds an event listener.
    O.prototype.addEvt = function(c, d, a) {
        c.addEventListener(d, a);
    };
    // Removes an event listener.
    O.prototype.remEvt = function(c, d, a) {
        c.removeEventListener(d, a);
    };
    // The main application logic and test runner.
    var jb = function() {
        // Function to toggle IP display.
        function c() {
            fa && (e.YourIP.el.textContent = "Please wait..", Y(7), fa = !1);
            e.ip();
        }
        // Main test start function.
        function d() {
            // Countdown logic.
            function b() {
                1 <= l ? (--l, e.LiveSpeed(l, "countDown")) : 0 >= l && (clearInterval(g), G = !0, Z = void 0, d());
            }
            Pa && (x.remEvt(e.settingsMob.el, "click", c), x.remEvt(e.settingsDesk.el, "click", c), x.remEvt(e.startButtonDesk.el, "click", d), x.remEvt(e.startButtonMob.el, "click", d), x.remEvt(document, "keypress", a), Pa = !1);
            if (0 <= Z) {
                G = !1;
                e.userInterface();
                ua = !1;
                var l = Math.ceil(Math.abs(Z));
                e.showStatus("Automatic Test Starts in ...");
                var g = setInterval(b, 1E3);
            }
            "fetch" === openSpeedTestServerList && !0 === G && (G = !1, e.showStatus("Fetching Server Info.."), Y(6));
            !0 === G && ("Ping" === A ? f() : "Download" === A ? f() : "Upload" === A ? f() : !1 === A && f());
        }
        // Handles 'Enter' key press to start the test.
        function a(b) {
            "Enter" === b.key && d();
        }
        // Starts the test after UI setup.
        function f() {
            ua && (e.userInterface(), ua = !1);
            t();
        }
        // Main test loop.
        function t() {
            function b() {
                va = window.performance.now();
                n();
            }
            var l = setInterval(function() {
                // ... state machine for test stages (Loaded, Ping, Download, Upload, etc.)
                "Loaded" === m && (m = "busy", Q());
                "Ping" === m && (m = "busy", e.showStatus("Milliseconds"));
                "Download" === m && (e.showStatus("Initializing.."), x.reset(), y = ha = 0, e.reset(), wa = window.performance.now(), w(), m = "initDown");
                if ("Downloading" === m) {
                    e.Symbol(0);
                    if (0 == aa) {
                        aa = 1;
                        e.showStatus("Testing download speed..");
                        var g = (window.performance.now() - wa) / 1E3;
                        Qa = g;
                        e.progress(1, dlDuration + 2.5);
                        dlDuration += g;
                    }
                    xa = (window.performance.now() - wa) / 1E3;
                    q("dl");
                    e.showStatus("Mbps download");
                    e.mainGaugeProgress(y);
                    e.LiveSpeed(y);
                    e.Graph(y, 0);
                    R = x.AvgSpeed(y, ya, dlDuration);
                    xa >= dlDuration && "done" == Ma && (A ? (e.GaugeProgresstoZero(y, "SendR"), e.showStatus("All done"), e.Symbol(2)) : e.GaugeProgresstoZero(y, "Upload"), e.downloadResult(R), ia = S, I = 1, m = "busy", y = ha = 0, x.reset());
                }
                "Upload" == m && 1 === I && (e.Symbol(1), m = "initup", e.showStatus("Initializing.."), e.LiveSpeed("...", "speedToZero"), za = x.uRandom(ulDataSize, b), A && (aa = 1));
                "Uploading" === m && (1 == aa && (aa = 2, e.showStatus("Testing upload speed.."), y = 0, x.reset(), e.reset(), Ra = g = (window.performance.now() - va) / 1E3, e.progress(!1, ulDuration + 2.5), ulDuration += g), e.showStatus("Mbps upload"), T = (window.performance.now() - va) / 1E3, q("up"), e.mainGaugeProgress(y), e.LiveSpeed(y), e.Graph(y, 1), U = x.AvgSpeed(y, Aa, ulDuration), T >= ulDuration && 1 == I && (ja = P, e.uploadResult(U), e.GaugeProgresstoZero(y, "SendR"), za = void 0, e.showStatus("All done"), e.Symbol(2), m = "busy", I = 0));
                if ("Error" === m) {
                    e.showStatus("Check your network connection status.");
                    e.ConnectionError();
                    m = "busy";
                    clearInterval(l);
                    e.oDoLiveSpeed.el.textContent = "Network Error";
                }
                "SendR" === m && (e.showStatus("All done"), e.oDoLiveSpeed.el.textContent = fb, m = "busy", clearInterval(l));
            }, 100);
        }
        // Starts download threads.
        function w() {
            for (var b = 0; b < dlThreads; b++) setTimeout(function(l) {
                M(l);
            }, dlDelay * b, b);
        }
        // Starts upload threads.
        function n() {
            for (var b = 0; b < ulThreads; b++) setTimeout(function(l) {
                F(l);
            }, ulDelay * b, b);
        }
        // Calculates live speed during a test.
        function q(b) {
            if ("dl" === b) {
                var l = 1E3 * xa;
                l > 1E3 * Qa + ya / 2 * 1E3 && 0 === Ua && (Ua = 1, ka *= .01, ca *= .01, la = l + 1E4);
                l >= la && la < gb && (la += 1E4, ka *= .01, ca *= .01);
                Va = 0 >= S ? 0 : S - Wa;
                Wa = S;
                ca += Va;
                Xa = Ea = l - Ea;
                Ea = l;
                ka += Xa;
                0 < ca && (y = ha = ca / ka / 125 * upAdjust);
            }
            "up" === b && (b = 1E3 * T, b > 1E3 * Ra + Aa / 2 * 1E3 && 0 === Ya && (Ya = 1, ma *= .1, da *= .1, na = b + 1E4), b >= na && na < hb && (na += 1E4, ma *= .1, da *= .1), Za = 0 >= P ? 0 : P - $a, $a = P, da += Za, ab = Fa = b - Fa, Fa = b, ma += ab, 0 < da && (y = ha = da / ma / 125 * upAdjust));
        }
        // Handles download requests via XMLHttpRequest.
        function M(b) {
            var l = 0;
            z[b] = new XMLHttpRequest;
            z[b].open("GET", Ga.Download + "?n=" + Math.random(), !0);
            z[b].onprogress = function(g) {
                if (1 === I) return z[b].abort(), z[b] = null, z[b] = void 0, delete z[b], !1;
                "initDown" == m && (m = "Downloading");
                var u = 0 >= g.loaded ? 0 : g.loaded - l;
                if (isNaN(u) || !isFinite(u) || 0 > u) return !1;
                S += u;
                l = g.loaded;
            };
            z[b].onload = function(g) {
                0 === l && (S += g.total);
                "initDown" == m && (m = "Downloading");
                z[b] && (z[b].abort(), z[b] = null, z[b] = void 0, delete z[b]);
                0 === I && M(b);
            };
            z[b].onerror = function(g) {
                0 === I && M(b);
            };
            z[b].responseType = "arraybuffer";
            z[b].send();
        }
        // Handles upload requests via XMLHttpRequest.
        function F(b) {
            var l = 0;
            v[b] = new XMLHttpRequest;
            v[b].open("POST", Ga.Upload + "?n=" + Math.random(), !0);
            v[b].upload.onprogress = function(g) {
                "initup" == m && void 0 === u && (m = "Uploading");
                if (T >= ulDuration) return v[b].abort(), v[b] = null, v[b] = void 0, delete v[b], !1;
                var u = 0 >= g.loaded ? 0 : g.loaded - l;
                if (isNaN(u) || !isFinite(u) || 0 > u) return !1;
                P += u;
                l = g.loaded;
            };
            v[b].onload = function() {
                if (0 === l && (P += 1048576 * ulDataSize, T >= ulDuration)) return v[b].abort(), v[b] = null, v[b] = void 0, delete v[b], !1;
                if ("initup" == m && void 0 === g) {
                    var g;
                    m = "Uploading";
                }
                v[b] && (v[b].abort(), v[b] = null, v[b] = void 0, delete v[b]);
                1 === I && F(b);
            };
            v[b].onerror = function(g) {
                T <= ulDuration && F(b);
            };
            v[b].setRequestHeader("Content-Type", "application/octet-stream");
            0 < b && 17E3 >= P || v[b].send(za);
        }
        // Pings servers to select the best one.
        function Q() {
            bb = openSpeedTestServerList.length;
            m = "Ping";
            performance.clearResourceTimings();
            if (Ha < bb - 1) Ha++, "Stop" != oa && ib(openSpeedTestServerList[Ha], Q);
            else if (1 <= pa.length) {
                var b = Math.min.apply(Math, Ia),
                    l = Ia.indexOf(b);
                Ga = pa[l];
                qa = b;
                Ja = cb[l];
                oa = "Busy";
                e.LiveSpeed(qa, "Ping");
                e.pingResults(qa, "Ping");
                e.jitterResult(Ja, "Jitter");
                Ca = qa;
                Da = Ja;
                m = A ? "Ping" == A ? "SendR" : A : "Download";
            } else pa.Download || (m = "Error");
        }
        // Logic for sending individual ping requests.
        function ib(b, l) {
            function g() {
                if (C < pingSamples) C++, "Stop" != oa && u();
                else {
                    if (1 < J.length) {
                        K.sort(function(D, B) {
                            return D - B;
                        });
                        K = K.slice(0, K.length * jitterFinalSample);
                        K = K.reduce(function(D, B) {
                            return D + B;
                        }, 0) / K.length;
                        var L = K.toFixed(1),
                            Ka = Math.min.apply(Math, J);
                        Ia.push(Ka);
                        pa.push(b);
                        cb.push(L);
                    }
                    "function" === typeof l && l();
                }
            }

            function u() {
                var L = new XMLHttpRequest;
                "Stop" != oa && L.abort();
                L.open(pingMethod, b[pingFile] + "?n=" + Math.random(), !0);
                L.timeout = pingTimeOut;
                var Ka = window.performance.now();
                L.send();
                L.onload = function() {
                    if (200 === this.status && 4 === this.readyState) {
                        var D = Math.floor(window.performance.now() - Ka),
                            B = performance.getEntries();
                        B = B[B.length - 1];
                        B = "xmlhttprequest" === B.initiatorType ? parseFloat(B.duration.toFixed(1)) : D;
                        250 < C && (B = D);
                        0 >= B ? J.push(.1) : J.push(B);
                        1 < J.length && (D = Math.abs(J[J.length - 1] - J[J.length - 2]).toFixed(1), K.push(parseFloat(D)), e.LiveSpeed(B, "Ping"), e.pingResults(B, "Ping"), e.jitterResult(D, "Jitter"));
                        g();
                    }
                    404 === this.status && 4 === this.readyState && (C++, g());
                };
                L.onerror = function(D) {
                    C++;
                    g();
                };
                L.ontimeout = function(D) {
                    C++;
                    g();
                };
            }
            var C = 0,
                J = [],
                K = [];
            u();
        }
        // Instantiates helper classes and defines variables.
        var x = new O,
            e = new r;
        e.app();
        var za, db = location.hostname,
            eb, La, R, U, Ca, Da, ea, V, z = [],
            ha, S = 0,
            P = 0,
            y = 0,
            T, xa, wa, va, ba, I = 0;
        var Ta = window.navigator.userAgent ? window.navigator.userAgent : "Not Found";
        var Aa = .6 * ulDuration,
            ya = .6 * dlDuration;
        7 <= .6 * ulDuration && (Aa = 7);
        7 <= .6 * dlDuration && (ya = 7);
        var G = !0,
            ua = !0;
        x.addEvt(e.settingsMob.el, "click", c);
        x.addEvt(e.settingsDesk.el, "click", c);
        x.addEvt(e.startButtonDesk.el, "click", d);
        x.addEvt(e.startButtonMob.el, "click", d);
        x.addEvt(document, "keypress", a);
        var Pa = !0,
            // Parses URL parameters.
            k = function(b) {
                var l = {},
                    g = document.createElement("a");
                g.href = b;
                b = g.search.substring(1).split("&");
                for (g = 0; g < b.length; g++) {
                    var u = b[g].split("=");
                    l[u[0]] = decodeURIComponent(u[1]);
                }
                return l;
            }(window.location.href.toLowerCase());
        // Logic for handling URL parameters to customize the test.
        if (setPingSamples && ("string" === typeof k.ping || "string" === typeof k.p)) {
            if ("undefined" !== typeof k.ping) var E = k.ping;
            else "undefined" !== typeof k.p && (E = k.p);
            0 < E && (pingSamples = pingSamples = E);
        }
        if (setPingTimeout && ("string" === typeof k.out || "string" === typeof k.o)) {
            if ("undefined" !== typeof k.out) var W = k.out;
            else "undefined" !== typeof k.o && (W = k.o);
            1 < W && (pingTimeOut = pingTimeOut = W);
        }
        if (setHTTPReq && ("string" === typeof k.xhr || "string" === typeof k.x)) {
            if ("undefined" !== typeof k.xhr) var ra = k.x;
            else "undefined" !== typeof k.x && (ra = k.x);
            0 < ra && 32 >= ra && (ulThreads = dlThreads = ra);
        }
        if (selectServer && ("string" === typeof k.host || "string" === typeof k.h)) {
            if ("undefined" !== typeof k.host) var sa = k.host;
            else "undefined" !== typeof k.h && (sa = k.h);
            /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(sa) && (openSpeedTestServerList = [{
                ServerName: "Home",
                Download: sa + "/downloading",
                Upload: sa + "/upload",
                ServerIcon: "DefaultIcon"
            }]);
        }
        E = parseInt(k.stress);
        W = parseInt(k.s);
        if ("string" === typeof k.stress) {
            var p = k.stress;
            var H = E;
        } else "string" === typeof k.s && (p = k.s, H = W);
        if (p && stressTest) {
            if ("low" === p || "l" === p) ulDuration = dlDuration = 300;
            if ("medium" === p || "m" === p) ulDuration = dlDuration = 600;
            if ("high" === p || "h" === p) ulDuration = dlDuration = 900;
            if ("veryhigh" === p || "v" === p) ulDuration = dlDuration = 1800;
            if ("extreme" === p || "e" === p) ulDuration = dlDuration = 3600;
            if ("day" === p || "d" === p) ulDuration = dlDuration = 86400;
            if ("year" === p || "y" === p) ulDuration = dlDuration = 31557600;
            if (12 < E || 12 < W) ulDuration = dlDuration = H;
        }
        p = parseInt(k.clean);
        H = parseInt(k.c);
        E = 1;
        p ? E = p : H && (E = H);
        if (enableClean && ("string" === typeof k.clean || "string" === typeof k.c))
            if (1 <= p || 1 <= H) {
                if (5 > p || 5 > H) upAdjust = 1 + E / 100, dlAdjust = 1 + E / 100;
            } else dlAdjust = upAdjust = 1;
        p = parseInt(k.run);
        H = parseInt(k.r);
        var Z;
        !enableRun || "string" !== typeof k.run && "string" !== typeof k.r || (Z = 0 < p ? p : 0 < H ? H : 0);
        0 <= Z && G && d();
        p = k.test;
        k = k.t;
        var A = !1;
        if (selectTest && ("string" === typeof p || "string" === typeof k)) {
            var N;
            p ? A = N = p : k && (A = N = k);
            if ("download" === N || "d" === N) {
                var ja = U = 0;
                A = "Download";
                G && d();
            } else if ("upload" === N || "u" === N) {
                var ia = R = 0;
                A = "Upload";
                I = 1;
                G && d();
            } else "ping" === N || "p" === N ? (ia = R = ja = U = 0, A = "Ping", G && d()) : A = !1;
        }
        var aa = 0,
            fa = !1,
            Ba = "OpenSpeedTest",
            Sa = ".com",
            fb = Ba + "\u2122",
            ta = 0;
        "web" === openChannel && (ta = webRe, fa = !0);
        "widget" === openChannel && (ta = widgetRe, fa = !0);
        "selfwidget" === openChannel && (ta = widgetRe, db = La = domainx);
        var Va = 0,
            Wa = 0,
            ca = 0,
            Xa = 0,
            Ea = 0,
            ka = 0,
            Ua = 0,
            Qa, Ra, Za = 0,
            $a = 0,
            da = 0,
            ab = 0,
            Fa = 0,
            ma = 0,
            Ya = 0,
            la, gb = 1E3 * dlDuration - 6E3,
            na, hb = 1E3 * ulDuration - 6E6,
            v = [],
            Ga, qa, Ja, oa, Ha = -1,
            Ia = [],
            pa = [],
            cb = [],
            bb = openSpeedTestServerList.length,
            // A utility function for making XHR requests.
            Y = function(b) {
                var l = new XMLHttpRequest,
                    g = OpenSpeedTestdb;
                1 == b && (g = webIP);
                5 == b && (g = saveDataURL);
                7 == b && (g = get_IP);
                l.open("POST", g, !0);
                l.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                l.onreadystatechange = function() {
                    4 == l.readyState && 200 == l.status && (V = l.responseText.trim(), 2 == b && (eb = V), 1 == b && (La = V), 3 == b && setTimeout(function() {
                        location.href = ta + V;
                    }, 1500), 6 == b && (openSpeedTestServerList = JSON.parse(V), G = !0, d()), 7 == b && (e.YourIP.el.textContent = V));
                };
                2 == b && (ea = "r=n");
                3 == b && (ea = "r=l&d=" + R + "&u=" + U + "&dd=" + (ia / 1048576).toFixed(3) + "&ud=" + (ja / 1048576).toFixed(3) + "&p=" + Ca + "&do=" + db + "&S=" + eb + "&sip=" + La + "&jit=" + Da + "&ua=" + Ta);
                5 == b && (ea = ba);
                6 == b && (ea = "r=s");
                l.send(ea);
            };
    };
    // Expose the main start function.
    X.Start = function() {
        new jb;
    };
})(window.OpenSpeedTest = window.OpenSpeedTest || {});
