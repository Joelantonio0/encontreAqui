import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import $ from 'jquery';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória')
});

const Login = () => {
  const toast = useRef(null);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const show = (mensagem, estado) => {
    toast.current.show({ severity: estado, detail: mensagem, life: 3000 });
  };

  const onSubmit = (data) => {
    $.ajax({
      url: 'http://localhost:5000/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (response) => {
        show("Usuário Logado com sucesso", "success");
        setTimeout(() => {
          window.location.href = '/home'; 
        }, 3000);
      },
      error: (xhr, status, error) => {
        console.log(data);
        const errMsg = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : 'Dados Invalidos';
        show(errMsg, "error");
      }
    });
  };

  const handlePasswordChange = (e) => {
    setValue('password', e.target.value);
    console.log('Password field updated:', e.target.value);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="p-d-flex p-jc-center p-ai-center p-mt-6" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f4f4f4' }}>
        <div className="p-card p-p-4 p-shadow-5" style={{ width: '100%', maxWidth: '500px', background: 'white', borderRadius: '10px' }}>
          <h2 className="p-text-center" style={{ textAlign: 'center' }}>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
              <label htmlFor="email" style={{ marginLeft: '5px' }}>Email</label>
              <InputText id="email" {...register('email')} className={errors.email ? 'p-invalid' : ''} style={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
              {errors.email && <small className="p-error">{errors.email.message}</small>}
            </div>
            <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
              <label htmlFor="password" style={{ marginLeft: '5px' }}>Senha</label>
              <Password id="password" {...register('password')} onChange={handlePasswordChange} feedback={false} className={errors.password ? 'p-invalid' : ''} inputStyle={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
              {errors.password && <small className="p-error">{errors.password.message}</small>}
            </div>
            <div className="p-d-flex p-jc-center" style={{ marginBottom: '1rem', textAlign: 'center', marginTop: '15px' }}>
              <Button type="submit" label="Login" className="p-button-rounded p-button-primary" style={{ width: '100px' }} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
