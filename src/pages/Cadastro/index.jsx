import React, { useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmacaoSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas devem corresponder').required('Confirmação de senha é obrigatória')
});

const Register = () => {
  const { register, handleSubmit, control, watch, formState: { errors }, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const toast = useRef(null);

  const show = (mensagem, estado) => {
    toast.current.show({ severity: estado, detail: mensagem, life: 3000 });
  };

  const onSubmit = async (data) => {
    try {
      const response = await $.ajax({
        url: 'http://localhost:5000/novo_usuario',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          nome: data.nome,
          email: data.email,
          senha: data.senha
        }),
      });
      console.log('Usuário cadastrado com sucesso:', data);

      if (response.success) {
        console.log('Usuário cadastrado com sucesso:', data);
        show('Usuário cadastrado com sucesso', 'success');
        reset();
      } else {
        console.error('Erro ao cadastrar usuário:', response.error);
        show(`Erro: ${response.error}`, 'error');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      show('Erro ao efetuar o cadastro', 'error');
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'senha' || name === 'confirmacaoSenha') {
        if (value.senha && value.confirmacaoSenha && value.senha !== value.confirmacaoSenha) {
          setError('confirmacaoSenha', {
            type: 'manual',
            message: 'As senhas devem corresponder'
          });
        } else {
          clearErrors('confirmacaoSenha');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setError, clearErrors]);

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-mt-6" style={{ height: '100vh', background: '#f4f4f4', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="p-card p-p-4" style={{ width: '100%', maxWidth: '500px', background: 'white', borderRadius: '10px' }}>
        <Toast ref={toast} />
        <h2 className="p-text-center" style={{ textAlign: 'center' }}>Cadastro</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
            <label htmlFor="nome" style={{ marginLeft: '5px' }}>Nome</label>
            <InputText id="nome" {...register('nome')} className={errors.nome ? 'p-invalid' : ''} style={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
            {errors.nome && <small className="p-error">{errors.nome.message}</small>}
          </div>
          <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
            <label htmlFor="email" style={{ marginLeft: '5px' }}>Email</label>
            <InputText id="email" {...register('email')} className={errors.email ? 'p-invalid' : ''} style={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
            {errors.email && <small className="p-error">{errors.email.message}</small>}
          </div>
          <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
            <label htmlFor="senha" style={{ marginLeft: '5px' }}>Senha</label>
            <Controller
              name="senha"
              control={control}
              render={({ field }) => (
                <Password id="senha" {...field} feedback={false} className={errors.senha ? 'p-invalid' : ''} inputStyle={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
              )}
            />
            {errors.senha && <small className="p-error">{errors.senha.message}</small>}
          </div>
          <div className="p-field p-mb-3" style={{ paddingLeft: '5px' }}>
            <label htmlFor="confirmacaoSenha" style={{ marginLeft: '5px' }}>Confirmar Senha</label>
            <Controller
              name="confirmacaoSenha"
              control={control}
              render={({ field }) => (
                <Password id="confirmacaoSenha" {...field} feedback={false} className={errors.confirmacaoSenha ? 'p-invalid' : ''} inputStyle={{ width: '100%', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: 'none' }} />
              )}
            />
            {errors.confirmacaoSenha && <small className="p-error">{errors.confirmacaoSenha.message}</small>}
          </div>
          <div className="p-d-flex p-jc-center" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
            <Button type="submit" label="Cadastrar" className="p-button-rounded p-button-primary" style={{ width: '100px' }} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
