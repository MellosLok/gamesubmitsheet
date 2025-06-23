import React, { useState } from 'react';

interface BasicInfo {
  phone: string;
  wechat: string;
}

interface BasicInfoFormProps {
  initialData?: BasicInfo;
  onSubmit: (data: BasicInfo) => void;
  onEdit?: () => void;
  isEditing?: boolean;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  initialData,
  onSubmit,
  onEdit,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<BasicInfo>(
    initialData || {
      phone: '',
      wechat: ''
    }
  );

  const [errors, setErrors] = useState<Partial<BasicInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<BasicInfo> = {};

    if (!formData.phone) {
      newErrors.phone = '请输入联系人手机号';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入正确的手机号格式';
    }

    if (!formData.wechat) {
      newErrors.wechat = '请输入微信号';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof BasicInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isEditing && initialData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">基本报名信息</h2>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            修改信息
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              联系人手机号
            </label>
            <p className="text-gray-900">{initialData.phone}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              微信号
            </label>
            <p className="text-gray-900">{initialData.wechat}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">基本报名信息</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            联系人手机号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="请输入手机号"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            微信号 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.wechat}
            onChange={(e) => handleInputChange('wechat', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.wechat ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="请输入微信号"
          />
          {errors.wechat && (
            <p className="mt-1 text-sm text-red-500">{errors.wechat}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          {initialData && (
            <button
              type="button"
              onClick={() => onSubmit(initialData)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {initialData ? '保存修改' : '提交信息'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm; 