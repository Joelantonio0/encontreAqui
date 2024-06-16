import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem corresponder').required('Confirmação de senha é obrigatória')
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-mt-6" style={{ height: '100vh', background: '#f4f4f4', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="p-card p-p-4" style={{ width: '100%', maxWidth: '500px', background: 'white', borderRadius: '10px' }}>
        <h2 className="p-text-center" style={{ textAlign: 'center' }}>Cadastro</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
            <label htmlFor="name" style={{ marginLeft: '5px' }}>Nome</label>
            <InputText id="name" {...register('name')} className={errors.name ? 'p-invalid' : ''} style={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
            {errors.name && <small className="p-error">{errors.name.message}</small>}
          </div>
          <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
            <label htmlFor="email" style={{ marginLeft: '5px' }}>Email</label>
            <InputText id="email" {...register('email')} className={errors.email ? 'p-invalid' : ''} style={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
            {errors.email && <small className="p-error">{errors.email.message}</small>}
          </div>
          <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
            <label htmlFor="password" style={{ marginLeft: '5px' }}>Senha</label>
            <Password id="password" {...register('password')} feedback={false} className={errors.password ? 'p-invalid' : ''} inputStyle={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
            {errors.password && <small className="p-error">{errors.password.message}</small>}
          </div>
          <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
            <label htmlFor="confirmPassword" style={{ marginLeft: '5px' }}>Confirmar Senha</label>
            <Password id="confirmPassword" {...register('confirmPassword')} feedback={false} className={errors.confirmPassword ? 'p-invalid' : ''} inputStyle={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
            {errors.confirmPassword && <small className="p-error">{errors.confirmPassword.message}</small>}
          </div>
          <div className="p-d-flex p-jc-center" style={{ marginBottom: '1rem', display:'flex',justifyContent:'center',alignItems:'center',marginTop:'15px' }}>
            <Button type="submit" label="Cadastrar" className="p-button-rounded p-button-primary" style={{ width: '100px' }} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
