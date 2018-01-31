class Dashboard {

    constructor() {
    	this.initEdit();
    	this.initEditDetails();
    	this.initAddNewTestCase();
    }

    initEdit () {
    	$(".edit-button").on("click", e => {
    		var $this = $(e.currentTarget);
    		var url = $this.data("url");
			window.location.href= `/testcase/getTestCases/${url}`;
		});
    }

    initEditDetails () {
    	if($(".form-validation").length) {
    		$(".form-validation").validate({
				errorPlacement: (error, element) => {
					error.appendTo(element.closest(".form-group"));
				},
				rules: {
					"title": {
						required: true,
					},
					"command": {
						required: true,
					}
				},
			});
    	}

    	$(".submit-button").on("click", e => {
    		e.preventDefault();
    		if ($(".form-validation").valid()) {
    		
				var $this = $(e.currentTarget);
				var id = $this.data("url");
				var url = $this.data("url") ? `/testcase/editTestCase/${id}` : `/testcase/createTestCase/`;
				var title = $("#title").val();
				var command = $("#command").val();
				var json = {};
				json.title = title;
				json.command = command;

				var redirectUrl = `/testcase/getTestCases/`;
				$.ajax({url: url, method: "POST", data: json,
					success: result => {
						setTimeout(() => {
								window.location.href = redirectUrl; //will redirect to your blog page (an ex: blog.html)
						}, 500);
					},
					error: err => {
						window.location.reload();
					}
				});
    		}
		});

    	$(".cancel-button").on("click", () => {
    		var redirectUrl = `/testcase/getTestCases/`;
    		window.location.href = redirectUrl;
    	});
    }

    initAddNewTestCase () {
    	$(".add-test-button").on("click", () => {
    		$(".add-test-button").addClass("hide");
    		$("#table").addClass("hide");
    		$("#form").addClass("show");
    	});

    	$(".cancel-test-button").on("click", () => {
			$(".add-test-button").removeClass("hide");
    		$("#table").removeClass("hide");
    		$("#form").removeClass("show");
    	});
    }
}

new Dashboard();
