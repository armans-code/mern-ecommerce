import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Form, Input, Button } from 'antd';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import './AccountSettings.css';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';

function AccountSettings() {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();

	const [disabledBtn, setDisabledBtn] = useState(true);

	const { auth } = useAuth();
	const profile = auth?.profile;
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		if (
			username === profile.firstName &&
			firstName === profile.firstName &&
			lastName === profile.lastName &&
			email === profile.email
		) {
			setDisabledBtn(true);
		} else {
			setDisabledBtn(false);
		}
	}, [firstName, lastName, email, username]);

	const handleSubmit = async () => {
		const response = await axiosPrivate.put(`users/edit/${auth?.id}`, {
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
		});
		window.location.reload();
	};

	return (
		<div className='account'>
			<Header />
			{profile && (
				<div className='account__content'>
					<AccountSidebar />
					<div className='account__content__right'>
						<div className='account__content__right__form'>
							<Form
								name='basic'
								labelCol={{
									span: 8,
								}}
								wrapperCol={{
									span: 16,
								}}
								initialValues={{
									firstName: profile.firstName,
									lastName: profile.lastName,
									username: profile.username,
									email: profile.email,
								}}
								onFinish={handleSubmit}
								autoComplete='off'
								className='main__form'
							>
								<Form.Item
									label='First Name'
									name='firstName'
									rules={[
										{
											required: true,
											message: 'Please input your first name!',
										},
									]}
								>
									<Input
										// defaultValue={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</Form.Item>

								<Form.Item
									label='Last Name'
									name='lastName'
									rules={[
										{
											required: true,
											message: 'Please input your last name!',
										},
									]}
								>
									<Input
										// defaultValue={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</Form.Item>

								<Form.Item
									label='Username'
									name='username'
									rules={[
										{
											required: true,
											message: 'Please input your username!',
										},
									]}
								>
									<Input onChange={(e) => setUsername(e.target.value)} />
								</Form.Item>

								<Form.Item
									label='Email'
									name='email'
									rules={[
										{
											required: true,
											message: 'Please input your email!',
										},
									]}
								>
									<Input
										// defaultValue={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Form.Item>

								<Form.Item
									wrapperCol={{
										offset: 8,
										span: 16,
									}}
								>
									<div className='account__content__right__form__lower'>
										<Button
											type='primary'
											htmlType='submit'
											disabled={disabledBtn}
										>
											Update
										</Button>
										<Link to='/changepassword' className='form__password__link'>
											<p>Change password?</p>
										</Link>
									</div>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default AccountSettings;
