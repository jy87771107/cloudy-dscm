!function () {
	var newArea = {
		selectedProvince: null,
		selectedCity: null,
		selectedArea: null,
		provinceOnly: false,
		changeProvinceOnly: function (value) {
			this.provinceOnly = value;
			if (value) {
				result.addClass("provinceOnly");
				if (this.selectedProvince != null) {
					result.empty().text(province.find("li.active:not(.spacer)").text());
				}
			} else {
				result.removeClass("provinceOnly");
			}
		}
	};
	window.newArea = newArea;

	var happend = $(".J_areaFullname, .J_addrSelect"),//触发元素
		result = $(".J_areaFullname"),
		sure = $(".J_sure"),//提交元素
		close = $(".J_close"),//关闭元素
		province = $(".g-province"),//省级列表容器
		city = $(".g-city"),//市级列表容器
		area = $(".g-area"),//县级列表容器
		markElem = $(".g-addrModal");

	var finger = null,
		startX = 0,
		startY = 0;

	function loadNextLevel(isCity) {
		if (newArea.provinceOnly)
			return;

		if (isCity) {
			var parentId = newArea.selectedProvince;
			var child = city;
			var childId = newArea.selectedCity
		} else {
			var parentId = newArea.selectedCity;
			var child = area;
			var childId = newArea.selectedArea
		}

		baseModel.get({
			url: "/webwine/agent/getAddr.cgi",
			data: {
				parent: parentId
			},
			success: function (rslt) {
				if (rslt.code != 0) {
					util.showPopupTips(rslt.message);
					return;
				}

				child.empty();

				var length = rslt.data.length;
				var list1 = [];
				var list2 = [];
				var selected = null;

				if (length <= 1)
					list1.push($("<li>").addClass("spacer")[0]);
				if (length <= 2)
					list1.push($("<li>").addClass("spacer")[0]);

				var i = 0;
				for (; i < length; i++) {
					var item = rslt.data[i];
					var li = $("<li>").data("id", item.id).data("fullname", item.fullName).text(item.name);
					if (item.id == childId) {
						li.addClass("active");
						selected = li;
						i++;
						break;
					}
					list1.push(li[0]);
				}
				for (; i < length; i++) {
					var item = rslt.data[i];
					var li = $("<li>").data("id", item.id).data("fullname", item.fullName).text(item.name);
					list2.push(li[0]);
				}

				if (length <= 3)
					list2.push($("<li>").addClass("spacer")[0]);
				if (length <= 4)
					list2.push($("<li>").addClass("spacer")[0]);
				if (length <= 5)
					list2.push($("<li>").addClass("spacer")[0]);

				if (selected == null) {
					child.append(list1).append(list2);
					selected = child.find("li").eq(2);
					selected.addClass("active");

					if (isCity) {
						newArea.selectedCity = selected.data("id");
					} else {
						newArea.selectedArea = selected.data("id");
					}
				} else {
					if (list1.length >= 2) {
						child.append(list1.splice(list1.length - 2, 2)).append(selected).append(list2).append(list1);
					} else {
						var d = 2 - list1.length;
						child.append(list2.splice(list2.length - d, d)).append(list1).append(selected).append(list2);
					}
				}

				if (isCity) {
					loadNextLevel(false);
				}

				var activeCity = city.find("li.active:not(.spacer)");
				var activeArea = area.find("li.active:not(.spacer)");
				if (activeArea.length != 0) {
					result.empty().text(activeArea.data("fullname"));
				} else {
					result.empty().text(activeCity.data("fullname"));
				}
			}
		})
	}

    function touchStart(e) {
		e.preventDefault();

        try {
			if (finger != null)
				return;

            var touch = e.changedTouches[0]; //获取第一个触点

            //记录触点初始位置
			finger = touch.identifier;
			startX = touch.pageX; //页面触点X坐标
			startY = touch.pageY; //页面触点Y坐标
        } catch (e) {
            console.log(e.message)
        }
    }

    function touchMove(e) {
		e.preventDefault();

		try {
			for (var i = 0; i < e.touches.length; i++) {
				var touch = e.touches[i]; //获取第 i 个触点

				if (touch.identifier != finger)
					continue;

				var x = touch.pageX, //页面触点X坐标
					y = touch.pageY; //页面触点Y坐标

				//判断滑动方向
				if (y - startY > 30) {//下滑
					var list = $(this).find("li");
					if (list.eq(1).hasClass("spacer")) {
						return;
					}

					list.last().prependTo(this);
					list.removeClass("active").eq(1).addClass("active");
					startY = y;
				} else if (startY - y > 30) {//上滑
					var list = $(this).find("li");
					if (list.eq(3).hasClass("spacer")) {
						return;
					}

					list.first().appendTo(this);
					list.removeClass("active").eq(3).addClass("active");
					startY = y;
				}

				return;
			}
        } catch (e) {
            console.log(e.message)
        }
    }

	function touchEnd(e) {
		e.preventDefault();

		try {
			for (var i = 0; i < e.changedTouches.length; i++) {
				var touch = e.changedTouches[i]; //获取第 i 个触点

				if (touch.identifier != finger)
					continue;

				finger = null;
				startX = 0;
				startY = 0;

				if ($(this).hasClass("g-province")) {
					var selected = $(this).find("li.active");
					newArea.selectedProvince = selected.data("id");
					if (newArea.provinceOnly) {
						result.empty().text(selected.text());
						city.empty();
						area.empty();
						return;
					} else {
						loadNextLevel(true);
					}
				} else if ($(this).hasClass("g-city")) {
					newArea.selectedCity = $(this).find("li.active:not(.spacer)").data("id");
					loadNextLevel(false);
				} else {
					newArea.selectedArea = $(this).find("li.active:not(.spacer)").data("id");
				}

				var activeCity = city.find("li.active:not(.spacer)");
				var activeArea = area.find("li.active:not(.spacer)");
				if (activeArea.length != 0) {
					result.empty().text(activeArea.data("fullname"));
				} else {
					result.empty().text(activeCity.data("fullname"));
				}

				return;
			}
        } catch (e) {
            console.log(e.message)
        }
    }

	var old = {
		selectedProvince: null,
		selectedCity: null,
		selectedArea: null,
		html: null
	};

	close.click(function () {
		document.documentElement.style.overflowY = "auto";
		markElem.hide().removeClass("f-unDone");

		newArea.selectedProvince = old.selectedProvince;
		newArea.selectedCity = old.selectedCity;
		newArea.selectedArea = old.selectedArea;
		result.html(old.html);
	});

	sure.click(function () {
		document.documentElement.style.overflowY = "auto";
		markElem.hide().removeClass("f-unDone");
	});

	function loadProvince() {
		if (province.children().length != 0) {
			loadNextLevel(true);
			return;
		}

		baseModel.get({
			url: "/webwine/agent/getAddr.cgi",
			success: function (rslt) {
				if (rslt.code != 0) {
					util.showPopupTips(rslt.message);
					return;
				}

				var length = rslt.data.length;
				var list1 = [];
				var list2 = [];
				var selected = null;
				var i = 0;
				for (; i < length; i++) {
					var item = rslt.data[i];
					var li = $("<li>").data("id", item.id).text(item.name);
					if (item.id == newArea.selectedProvince) {
						li.addClass("active");
						selected = li;
						i++;
						break;
					}
					list1.push(li[0]);
				}
				for (; i < length; i++) {
					var item = rslt.data[i];
					var li = $("<li>").data("id", item.id).text(item.name);
					list2.push(li[0]);
				}

				if (selected == null) {
					province.append(list1).append(list2);

					selected = province.find("li").eq(2);
					selected.addClass("active");
					newArea.selectedProvince = selected.data("id");
					result.empty().text(selected.text());
				} else {
					if (list1.length > 2) {
						province.append(list1.splice(list1.length - 3, 2)).append(selected).append(list2).append(list1);
					} else {
						province.append(list2.splice(list2.length - 3, 2)).append(selected).append(list1).append(list2);
					}
				}

				loadNextLevel(true);
			}
		})
	}

	happend.click(function () {
		markElem.addClass("f-unDone").show();

		old.selectedProvince = newArea.selectedProvince;
		old.selectedCity = newArea.selectedCity;
		old.selectedArea = newArea.selectedArea;
		old.html = result.html();

		document.documentElement.style.overflowY = "hidden";

		if (newArea.provinceOnly) {
			$(".g-addrSection").addClass("provinceOnly");
		} else {
			$(".g-addrSection").removeClass("provinceOnly");
		}

		loadProvince();
	})

	function bindEvent(ele) {
		ele.on('touchstart', touchStart);
        ele.on('touchmove', touchMove);
        ele.on('touchend', touchEnd);
    }

	bindEvent(province);
	bindEvent(city);
	bindEvent(area);
} ();