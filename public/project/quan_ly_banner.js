new Vue({
    el: "#app",
    data: {
        list_vue: [],
        idDelete: '',
        update: {
            idEdit: '',
            hinh_anh_1_edit: '',
            hinh_anh_2_edit: '',
            hinh_anh_3_edit: '',
            hinh_anh_4_edit: '',
            hinh_anh_5_edit: '',
        },
        add: {
            hinh_anh_1: '',
            hinh_anh_2: '',
            hinh_anh_3: '',
            hinh_anh_4: '',
            hinh_anh_5: '',
        },
    },

    created() {
        this.getData();
    },

    methods: {
        create(e) {
            this.add.hinh_anh_1 = $("#hinh_anh_1").val();
            this.add.hinh_anh_2 = $("#hinh_anh_2").val();
            this.add.hinh_anh_3 = $("#hinh_anh_3").val();
            this.add.hinh_anh_4 = $("#hinh_anh_4").val();
            this.add.hinh_anh_5 = $("#hinh_anh_5").val();
            console.log(this.add);
            e.preventDefault();
            axios
                .post('/admin/quan-ly-banner/create', this.add)
                .then((res) => {
                    toastr.success("Đã thêm ảnh mới!");
                    this.getData();
                })
                .catch((res) => {
                    var errors = res.response.data.errors;
                    $.each(errors, function(k, v) {
                        toastr.error([0]);
                    });
                });

        },

        getData() {
            axios
                .get('/admin/quan-ly-banner/getData')
                .then((res) => {
                    this.list_vue = res.data.banner;
                })
        },

        doiTrangThai(id) {
            axios
                .get('/admin/quan-ly-banner/changeStatus/' + id)
                .then((res) => {
                    if (res.data.trangThai) {
                        toastr.success('Đã đổi trạng thái thành công!');
                        // Tình trạng mới là true
                        this.getData();
                    } else {
                        toastr.error('Vui lòng không can thiệp hệ thống!');
                    }
                })
        },

        search() {
            var payload = {
                'search': this.inputSearch,
            };
            axios
                .post('/admin/danh-muc/search', payload)
                .then((res) => {
                    this.list_vue = res.data.datasearch;
                });
        },

        deleteBanner(id) {
            this.idDelete = id;
        },

        acceptDelete() {
            axios
                .delete('/admin/quan-ly-banner/delete/' + this.idDelete)
                .then((res) => {
                    if (res.data.status) {
                        toastr.success('Đã xóa banner thành công');
                        this.getData();
                    } else {
                        toastr.error('Danh mục không tồn tại');
                    }
                })
        },

        editDanhMuc(id) {
            this.update.idEdit = id;
            console.log(this.update.idEdit);
            axios
                .get('/admin/quan-ly-banner/edit/' + id)
                .then((res) => {
                    if (res.data.status) {
                        this.update.hinh_anh_1_edit = res.data.banner.banner_1;
                        this.update.hinh_anh_2_edit = res.data.banner.banner_2;
                        this.update.hinh_anh_3_edit = res.data.banner.banner_3;
                        this.update.hinh_anh_4_edit = res.data.banner.banner_4;
                        this.update.hinh_anh_5_edit = res.data.banner.banner_5;
                    } else {
                        toastr.error('Danh mục không tồn tại');
                    }
                })


        },

        acceptUpdate() {
            this.update.hinh_anh_1_edit = $("#hinh_anh_1_edit").val();
            this.update.hinh_anh_2_edit = $("#hinh_anh_2_edit").val();
            this.update.hinh_anh_3_edit = $("#hinh_anh_3_edit").val();
            this.update.hinh_anh_4_edit = $("#hinh_anh_4_edit").val();
            this.update.hinh_anh_5_edit = $("#hinh_anh_5_edit").val();
            console.log(this.update);

            axios
                .post('/admin/quan-ly-banner/update', this.update)
                .then((res) => {
                    if (res) {
                        toastr.success('Cập nhật thành công banner!');
                        this.getData();
                    }else{
                        toastr.error('Cập nhật thất bại');q
                    }

                })
                .catch((res) => {
                    var danh_sach_loi = res.response.data.errors;
                    $.each(danh_sach_loi, function(key, value) {
                        toastr.error(value[0]);
                    });
                });
        },
        search() {
            var payload = {
                'tenDanhMuc': this.inputSearch,
            };
            axios
                .post('/admin/danh-muc/search', payload)
                .then((res) => {
                    this.list_vue = res.data.dataSearch;
                    console.log(this.list_vue);
                });
        },
    },
});
