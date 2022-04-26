import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import './CreateProduct.css';
import { Button, Input, Select } from 'antd';
import { InputNumber } from 'antd';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

function CreateProduct() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState();
	const [price, setPrice] = useState();
	const [quantity, setQuantity] = useState();
	const [category, setCategory] = useState();

	const axiosPrivate = useAxiosPrivate();

	const { auth } = useAuth();
	const { Option } = Select;
	const { TextArea } = Input;
	const { Dragger } = Upload;

	const props = {
		name: 'file',
		multiple: false,
		beforeUpload: () => false,
		onChange(info) {
			setImage(info.file);
		},
		onDrop(e) {
			console.log('Dropped files');
		},
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('category', category);
		formData.append('price', price);
		formData.append('quantity', quantity);
		formData.append('img', image);
		formData.append('user', auth?.id);

		const uploadProduct = async () => {
			const response = await axiosPrivate({
				method: 'post',
				url: 'http://localhost:5000/products/new',
				data: formData,
			}).then((response) => {
				console.log(response);
			});
		};

		try {
			uploadProduct();
		} catch (error) {
			console.log(error);
		}
	};

	console.log(category);
	return (
		<div className='c'>
			<DashboardSidebar />
			<div className='create'>
				<div className='create__form'>
					<Input
						placeholder='Product Name'
						onChange={(e) => setName(e.target.value)}
					/>
					<TextArea
						rows={5}
						placeholder='Description'
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div className='create__form__bottom'>
						<div>
							<p>Category:</p>
							<Select
								showSearch
								style={{ width: 200 }}
								placeholder='Fashion'
								onChange={(value) => setCategory(value)}
							>
								<Option value='fashion'>Fashion</Option>
								<Option value='electronics'>Electronics</Option>
								<Option value='toys'>Toys</Option>
								<Option value='fitness'>Fitness</Option>
							</Select>
						</div>
						<div>
							<p>Quantity:</p>
							<InputNumber
								placeholder={1}
								onChange={(value) => setQuantity(value)}
								// style={{ width: 200 }}
							/>
						</div>
						<div>
							<p>Price:</p>
							<InputNumber
								prefix='$'
								placeholder={0.0}
								onChange={(value) => setPrice(value)}
							/>
						</div>
					</div>
					<Dragger {...props}>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-text'>
							Click or drag file to this area to upload
						</p>
						<p className='ant-upload-hint'>
							Support for a single or bulk upload. Strictly prohibit from
							uploading company data or other band files
						</p>
					</Dragger>
					<Button type='primary' onClick={handleSubmit}>
						Upload Product
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CreateProduct;
