import { useForm } from 'react-hook-form'


const Login = () => {
  const { handleSubmit, register, reset } = useForm()
  const submit = (data) => {
    // 送信ボタンを押したら入力欄をブランク状態に戻す
    reset({ message: '' })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <textarea
          placeholder="メッセージを入力"
          // https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react
          {...register('message', { required: true })}
        />
        <button>送信</button>
      </form>
    </div>
  )
}

export default Login