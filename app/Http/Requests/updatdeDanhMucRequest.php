<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updatdeDanhMucRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'idEdit'                =>  'required|exists:danh_muc_san_phams,id',
            'ten_danh_muc_edit'      =>  'required|max:50|unique:danh_muc_san_phams,ten_danh_muc,'.$this->idEdit,
            'is_open_edit'           =>  'required|boolean',
        ];
    }

    public function messages()
    {
        return [
            'required'      =>  ':attribute không được để trống',
            'max'           =>  ':attribute quá dài',
            'exists'        =>  ':attribute không tồn tại',
            'boolean'       =>  ':attribute chỉ được chọn True/False',
            'unique'        =>  ':attribute đã tồn tại',
        ];
    }

    public function attributes()
    {
        return [
             'id'                =>  'id_danhmuc',
            'ten_danh_muc_edit'      =>  'Tên danh mục',
            // 'slug_danh_muc'     =>  'Slug danh mục',
            // 'hinh_anh'          =>  'Hình ảnh',
            'id_danh_muc_cha'   =>  'Danh mục cha',
            'is_open_edit'           =>  'Tình trạng',
        ];
    }
}
