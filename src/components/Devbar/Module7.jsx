import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Создать компонент <code>AuthProvider</code>',
  'Добавить <code>AuthProvider</code> в приложение',
  'Получить токен доступа <code>token</code> в <code>AuthProvider</code>',
  'Скрыть <code>Navbar</code>, когда не выполнен вход',
  'Создать компонент <code>SignInPage</code>',
  'Добавить <code>SignInPage</code> в <code>Router</code>',
  'Создать компонент <code>SignInForm</code>',
  'Добавить <code>SignInForm</code> на <code>SignInPage</code>',
  'Обработать отправку <code>SignInForm</code>',
  'Включить аутентификацию в <code>env</code> и выполнить вход',
  'Добавить <code>token</code> пользователя ко всем запросам',
  'Обновить <code>token</code> при истечении срока действия',
  'Создать компонент <code>Route</code>',
  'Обновить все маршруты с помощью <code>Route</code>',
  'Перенаправить на <code>/</code>, когда выполнен вход',
  'Создать кнопку выхода в <code>Navbar</code>',
];


export const Intro = () => {
  return (
    <div>
      <h2>Модуль 7 - Формы и Аутентификация</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы будем реализовывать формы и аутентификацию. Мы
        переместим наше приложение за экран входа и разрешим его использование
        только вошедшим пользователям. Мы создадим собственный слой
        аутентификации с использованием JWT, надежно храним токены в памяти и
        настроим React Hook Form для легкой реализации форм в нашем
        приложении!
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        В данный момент наше приложение доступно всем без учетной записи. В
        реальном приложении большая часть функционала будет скрыта за экраном
        входа, и только пользователи с учетной записью смогут им пользоваться.
        Для этого нам нужно будет создать страницу «Вход», чтобы пользователи
        могли войти, а также кнопку «Выход», чтобы пользователи могли выйти.
        Страница «Вход» будет содержать форму, которая будет включать поле для
        ввода электронной почты, а также поле для ввода пароля для входа. Форма
        должна обрабатывать валидацию и позволять нам настраивать правила
        валидации для каждого поля. Когда введенные учетные данные будут
        действительными, мы должны перенаправить пользователя на главную
        страницу.
      </p>
      <p>
        Мы также должны будем обрабатывать токен доступа пользователя, храня его
        в памяти. Мы не будем хранить его в <code>localStorage</code>, так как
        это небезопасно и может привести к XSS-атакам. Наш мок API будет
        обрабатывать генерацию и валидацию токена, а также предоставлять нам
        конечную точку для обновления токена пользователя. Мы должны будем
        сохранить его и добавлять в каждый запрос, который делает пользователь.
      </p>
      <p>
        Для всего этого нам нужно будет настроить React Hook Form, создать
        компоненты <code>SignInPage</code> и <code>SignInForm</code>, а также
        создать пользовательский <code>AuthProvider</code> для хранения токена
        пользователя и перехвата наших API-запросов. В <code>Navbar</code> мы
        также добавим кнопку для выхода, которая должна будет выйти из системы
        и перенаправить пользователя на страницу входа.
      </p>
      <p>
        Нам также нужно будет обрабатывать обновление токена доступа
        пользователя. Поскольку мы храним его только в памяти, он будет
        теряться каждый раз, когда пользователь обновляет страницу. Мы
        реализуем базовую версию обновления и доступа токенов. Это будет
        самой крупной функцией нашего приложения на данный момент, так что
        готовьтесь!
      </p>
      <h3>Задачи</h3>
      <Separator className='mb-2' />
      <ul>
        {tasks.map((task) => (
          <li key={task} dangerouslySetInnerHTML={{ __html: task }} />
        ))}
      </ul>
    </div>
  );
};


const authProviderCode = `import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>AuthProvider</code>
      </h2>
      <p>
        Первое, что нам нужно сделать, это создать провайдер, который будет
        хранить <code>токен</code> доступа пользователя. Этот провайдер будет
        ответственен за получение и хранение <code>токена</code> в контексте и
        его доступность для использования во всем приложении. Это токен, который
        мы будем использовать для аутентификации и идентификации пользователя,
        чтобы разрешить ему доступ к приложению.
      </p>
      <p>
        Мы создадим новый контекст, называемый <code>AuthContext</code>, с
        использованием API контекста React, и создадим пользовательский хук для
        работы с этим контекстом. Внутри него мы будем иметь переменную
        состояния для хранения <code>токена</code> и функцию для его
        обновления.
      </p>
      <p>
        Мы установим <code>токен</code> по умолчанию на <code>undefined</code>
        при первоначальной монтировке. Позже мы будем использовать это состояние,
        чтобы определить, был ли <code>токен</code> получен или нет. Это будет
        полезно для отображения состояния ожидания пользовательского интерфейса,
        пока <code>токен</code> загружается, и для определения, вошел ли
        пользователь в систему после его получения.
      </p>
      <p>
        Важно отметить, что этот токен хранится в состоянии, что означает, что
        мы храним его в памяти. Каждый раз, когда пользователь обновляет
        страницу, токен будет сбрасываться на <code>undefined</code> и должен
        будет быть обновлен. Мы реализуем это на следующих этапах.
      </p>
      <p>
        Нам нужно будет создать новый файл в папке <code>src/components</code>{' '}
        с названием <code>AuthProvider.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/AuthProvider.jsx'>
        {authProviderCode}
      </CodeHighlighter>
    </div>
  );
};


const mainWithAuthProviderCode = `import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { seedLocalDatabase } from '@/api/data/seed';
import AuthProvider from '@/components/AuthProvider';
import ThemeProvider from '@/components/ThemeProvider';
import { store } from '@/state/store';

import Router from './Router';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  </ThemeProvider>,
);`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Добавление <code>AuthProvider</code> в приложение
      </h2>
      <p>
        Теперь, когда у нас есть <code>AuthProvider</code>, следующим шагом
        будет обернуть наше приложение в него, чтобы мы могли получить к нему
        доступ из любого компонента во всем приложении.
      </p>
      <p>
        Мы добавим это на верхнем уровне нашего приложения и обернем{' '}
        <code>Router</code>, чтобы мы могли получать доступ к{' '}
        <code>токену</code> откуда угодно.{' '}
        <code>Router</code> содержит каждый компонент, который у нас будет в
        приложении.
      </p>
      <p>
        Нам нужно будет обновить файл <code>main.jsx</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[5, 19, 21]} title='src/main.jsx'>
        {mainWithAuthProviderCode}
      </CodeHighlighter>
    </div>
  );
};


const authProviderWithFetchMeCode = `import { createContext, useContext, useEffect, useState } from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Получение доступа к <code>токену</code> в <code>AuthProvider</code>
      </h2>
      <p>
        Теперь, когда наш <code>AuthProvider</code> настроен и подключен к
        приложению, следующим шагом будет получение <code>токена</code> из API
        и сохранение его в провайдере, чтобы он больше не был{' '}
        <code>undefined</code>. Мы будем использовать конечную точку{' '}
        <code>/api/me</code> для этого, которая вернет{' '}
        <code>токен</code>, если пользователь вошел в систему. Это позволит
        нам определить состояние входа пользователя сразу после монтирования
        приложения.
      </p>
      <p>
        Мы создадим <code>useEffect</code> с функцией <code>fetchMe</code> для
        получения <code>токена</code>. Если запрос будет успешным, мы
        обновим состояние <code>токена</code> полученным{' '}
        <code>response.data.accessToken</code>. Если запрос завершится
        неудачно, мы установим состояние <code>токена</code> в{' '}
        <code>null</code>. Мы специально устанавливаем его в{' '}
        <code>null</code> вместо <code>undefined</code>, чтобы
        различать два состояния. <code>null</code> будет означать, что мы его
        получили, но он не был доступен, а{' '}
        <code>undefined</code> будет означать, что он еще не был
        получен.
      </p>
      <p>
        Нам нужно будет обновить <code>AuthProvider.jsx</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          1, 3, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ]}
        title='src/components/AuthProvider.jsx'
      >
        {authProviderWithFetchMeCode}
      </CodeHighlighter>
    </div>
  );
};


const appWithAuthCode = `import { Outlet } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import Devbar from '@/components/Devbar/Devbar';
import Navbar from '@/components/Navbar';

const App = () => {
  const { token } = useAuth();

  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        {token && <Navbar />}
        <Outlet />
      </div>
    </>
  );
};

export default App;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Скрытие <code>Navbar</code>, когда пользователь не вошел в систему
      </h2>
      <p>
        Теперь, когда <code>токен</code> получен и доступен в нашем
        приложении, мы можем начать его использовать. Первое, что мы хотим
        сделать, — это скрыть компонент <code>Navbar</code>, если пользователь не
        вошел в систему. Это подготовит нас к тому, что мы будем показывать
        экран входа, который не должен иметь навигационную панель.
      </p>
      <p>
        Чтобы проверить наличие <code>токена</code>, мы можем импортировать{' '}
        <code>useAuth</code>, пользовательский хук из <code>AuthProvider</code>,
        и использовать его. Это даст нам доступ к значению <code>токена</code>,
        поскольку он обновляется <code>AuthProvider</code>.
      </p>
      <p>
        Поскольку мы ранее определили, что значение <code>токена</code> равное{' '}
        <code>undefined</code> означает, что мы его еще не получили, а значение
        <code>null</code> означает, что <code>токен</code> был получен, но
        пользователь не вошел в систему, мы можем использовать это, чтобы
        определить, нужно ли показывать <code>Navbar</code> или нет. В данном
        случае мы не хотим показывать <code>Navbar</code> в любом случае.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>App</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[3, 8, 16]} title='src/App.jsx'>
        {appWithAuthCode}
      </CodeHighlighter>
    </div>
  );
};


const signInPageCode = `const SignInPage = () => {
  return (
    <div className='container flex h-screen items-center justify-center py-4'>
      Sign in form goes here!
    </div>
  );
};

export default SignInPage;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>SignInPage</code>
      </h2>
      <p>
        Теперь давайте создадим страницу "Вход". Мы создадим компонент{' '}
        <code>SignInPage</code> в папке <code>pages</code>. Это будет простой
        компонент страницы, который будет рендерить наши обычные стили страницы.
        На данный момент мы отобразим простое сообщение "Форма входа будет
        здесь!", так как мы еще не создали форму входа.
      </p>
      <p>
        Для этой страницы мы также добавим немного стилей, чтобы центрировать
        содержимое посередине страницы. Это подготовительная работа для
        создания компонента формы входа, который будет довольно маленьким по
        размеру и должен быть отцентрирован.
      </p>
      <p>
        Мы создадим новый файл в папке <code>src/pages</code> под названием{' '}
        <code>SignInPage.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/pages/SignInPage.jsx'>
        {signInPageCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithSignInPageCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/SignInPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
      {
        path: '/favorites',
        element: <ListingFavoritesPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Добавление <code>SignInPage</code> в <code>Router</code>
      </h2>
      <p>
        Теперь, когда мы создали <code>SignInPage</code>, как обычно, нам нужно
        добавить его в наш маршрутизатор, чтобы мы могли к нему перейти. Мы
        добавим его по пути <code>/signin</code>. Это сделает его доступным на
        том же уровне, что и все наши другие маршруты.
      </p>
      <p>
        В настоящее время эта страница будет доступна независимо от того,
        подписан ли пользователь или нет. В последующих этапах мы создадим
        компонент для защиты каждого маршрута и позволим доступ к определённым
        маршрутам только если пользователь подписан.
      </p>
      <p>
        Нам нужно обновить компонент <code>Router</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[7, 17, 18, 19, 20]}
        title='src/Router.jsx'
      >
        {routerWithSignInPageCode}
      </CodeHighlighter>
    </div>
  );
};


const signInFormCode = `import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input {...register('password')} type='password' />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <Button>Sign In</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>SignInForm</code>
      </h2>
      <p>
        Теперь нам нужно создать компонент <code>SignInForm</code>. Этот
        компонент будет отвечать за отображение формы входа, обработку
        валидации и отправку данных формы на API, чтобы пользователь мог
        войти в наше приложение.
      </p>
      <p>
        <code>SignInForm</code> будет компонентом функционала, который
        будет обрабатывать все, что связано с функцией входа пользователя. Мы
        сможем использовать этот компонент на любой странице или разделе
        страницы, где мы хотим иметь функцию входа.
      </p>
      <p>
        Мы будем использовать React Hook Form для обработки валидации и
        отправки формы, а также библиотеку <code>zod</code> для определения
        схемы нашей формы и использования ее для валидации формы. Мы сможем
        внедрить схему <code>zod</code> в React Hook Form через функцию{' '}
        <code>zodResolver</code>.
      </p>
      <p>
        Мы оставим всё простым, включив только поля <code>email</code> и{' '}
        <code>password</code>. Мы используем функцию <code>z.email()</code>{' '}
        для того, чтобы убедиться, что принимаются только действительные
        адреса электронной почты. Для пароля мы просто ограничим его
        минимум 8 символами.
      </p>
      <p>
        Мы создадим новый файл в папке <code>src/components</code> с
        названием <code>SignInForm.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/SignInForm.jsx'>
        {signInFormCode}
      </CodeHighlighter>
    </div>
  );
};


const signInPageWithSignInFormCode = `import SignInForm from '@/components/SignInForm';

const SignInPage = () => {
  return (
    <div className='container flex h-screen items-center justify-center py-4'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Добавление <code>SignInForm</code> на <code>SignInPage</code>
      </h2>
      <p>
        Теперь, когда мы создали <code>SignInForm</code>, нам нужно добавить его
        в компонент <code>SignInPage</code>. Мы сделаем это, импортировав{' '}
        <code>SignInForm</code> и отобразив его на странице.
      </p>
      <p>
        Поскольку мы уже добавили стили контейнера на эту страницу, форма
        отображается в центре страницы, как и следовало ожидать от любого
        другого приложения!
      </p>
      <p>
        Нам нужно обновить компонент <code>SignInPage</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 6]}
        title='src/pages/SignInPage.jsx'
      >
        {signInPageWithSignInFormCode}
      </CodeHighlighter>
    </div>
  );
};


const signInFormWithOnSubmitCode = `import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const { setToken } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/signin', data);
      setToken(response.data.accessToken);
    } catch (e) {
      setError('root', {
        message: e.response.data.message,
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input {...register('password')} type='password' />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Loading...' : 'Sign In'}
          </Button>

          {errors.root && (
            <div className='text-center text-sm text-red-500'>
              {errors.root.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Обработка отправки <code>SignInForm</code>
      </h2>
      <p>
        Теперь, когда мы создали <code>SignInForm</code>, нам нужно обработать
        отправку формы, когда пользователь пытается войти в систему. Что нам нужно
        сделать, так это отправить запрос на сервер с данными <code>email</code> и{' '}
        <code>password</code>, чтобы сервер мог проверить учетные данные пользователя.
      </p>
      <p>
        Мы будем использовать конечную точку <code>/api/signin</code>, которая
        вернет токен доступа, если учетные данные пользователя действительны, в
        противном случае она вызовет ошибку. Затем, как только мы получим токен
        доступа, нам нужно использовать функцию <code>setToken</code> из{' '}
        <code>AuthProvider</code> через <code>useAuth</code>, чтобы сохранить токен
        в провайдере и сделать его доступным в нашем приложении.
      </p>
      <p>
        Поскольку мы используем React Hook Form, нам не нужно отслеживать свои
        собственные состояния загрузки и ошибок. Мы получаем доступ к свойству{' '}
        <code>isSubmitting</code>, а также к свойству <code>errors</code>, которое
        мы создали ранее. Мы можем использовать их, чтобы определить, в каком
        состоянии находится форма.
      </p>
      <p>
        Однако нам нужно обработать случай, когда API вызывает ошибку, например,
        когда учетные данные пользователя недействительны. Для этого мы можем
        использовать функцию <code>setError</code> из React Hook Form, чтобы установить
        "корневую" ошибку. Мы установим ее под <code>root</code>. Это затем будет
        доступно через <code>errors.root</code>, что мы можем использовать для
        отображения в пользовательском интерфейсе.
      </p>
      <p>
        Нам нужно обновить компонент <code>SignInForm</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          5, 6, 22, 25, 26, 28, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 73, 74,
          77, 78, 79, 80, 81,
        ]}
        title='src/components/SignInForm.jsx'
      >
        {signInFormWithOnSubmitCode}
      </CodeHighlighter>
    </div>
  );
};


const envWithAuthCode = `VITE_BASE_URL=http://localhost:5173
VITE_USE_AUTH=true`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Включение аутентификации в <code>env</code> и вход в систему
      </h2>
      <p>
        В настоящее время функции аутентификации отключены в нашем приложении. Даже
        с действительными учетными данными вход в систему не приведет к фактическому
        входу пользователя. Это было сделано, чтобы мы могли строить приложение
        до этого момента, не беспокоясь об аутентификации.
      </p>
      <p>
        Однако, чтобы мы могли продолжить, нам нужно включить ее. Для этого просто
        измените переменную окружения <code>VITE_USE_AUTH</code> и установите ее в{' '}
        <code>true</code>. Это включит аутентификацию и заблокирует все запросы к
        приложению, если пользователь не вошел в систему. В таком случае
        приложение в основном перестанет работать, но мы это исправим в следующих
        шагах!
      </p>
      <p>
        С включенной аутентификацией теперь мы можем войти в приложение, используя
        доступную демонстрационную учетную запись. Электронная почта{' '}
        <code>demo@test.io</code>, а пароль{' '}
        <code>password12345</code>. Мы можем войти, увидеть появление{' '}
        <code>Navbar</code> и даже попробовать перейти на страницу "Домашняя"! Но
        поскольку наш <code>token</code> еще не отправляется в любых запросах, мы
        не увидим никаких данных.
      </p>
      <p>
        Нам нужно обновить файл <code>.env</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[4]} title='src/.env'>
        {envWithAuthCode}
      </CodeHighlighter>
    </div>
  );
};


const authProviderWithRequestInterceptorCode = `import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = token
        ? ${'`Bearer ${token}`'}
        : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;`;

export const Step11 = () => {
  return (
    <div>
      <h2>
        Добавление <code>token</code> пользователя ко всем запросам
      </h2>
      <p>
        Следующий шаг, прежде чем мы сможем полностью завершить нашу
        аутентификацию, заключается в том, что нам нужно добавить
        <code>token</code> пользователя ко всем запросам. На данный момент,
        даже если пользователь вошел в систему с правильными учетными данными
        и <code>token</code> хранится в компоненте <code>AuthProvider</code>,
        мы не отправляем этот токен в никаких запросах, поэтому сервер будет
        считать пользователя неавторизованным.
      </p>
      <p>
        Чтобы это исправить, нам нужно будет отправить его в каждом запросе,
        используя перехватчики из <code>axios</code>. Перехватчики позволяют
        нам перехватывать запросы перед их отправкой и ответы перед их
        возвратом. Мы будем использовать это, чтобы добавить токен ко всем
        нашим запросам, когда они отправляются.
      </p>
      <p>
        Самое логичное место для добавления этого кода — это внутри{' '}
        <code>AuthProvider</code>, так как именно там хранится <code>token</code>.
        Мы хотим зарегистрировать перехватчик при монтировании и каждый раз,
        когда <code>token</code> изменяется. Это обеспечит синхронизацию
        последнего токена со всеми нашими запросами.
      </p>
      <p>
        Для этого мы будем использовать <code>useLayoutEffect</code>, так как это
        предотвратит дальнейшую отрисовку до выполнения кода внутри. Это
        предотвратит состояние гонки, когда токен будет обновлен после
        монтирования дочернего компонента и отправки запроса.
      </p>
      <p>
        Нам нужно обновить компонент <code>AuthProvider</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[5, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]}
        title='src/components/AuthProvider.jsx'
      >
        {authProviderWithRequestInterceptorCode}
      </CodeHighlighter>
    </div>
  );
};


const authProviderWithResponseInterceptorCode = `import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? ${'`Bearer ${token}`'}
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === 'Unauthorized'
        ) {
          try {
            const response = await api.get('/api/refreshToken');

            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = ${'`Bearer ${response.data.accessToken}`'};
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;`;

export const Step12 = () => {
  return (
    <div>
      <h2>
        Обновление <code>token</code> при истечении срока действия
      </h2>
      <p>
        На предыдущем шаге мы добавили <code>token</code> ко всем запросам.
        В целях безопасности этот токен действителен только в течение 15
        минут. После этого нам нужно будет обновить его от имени пользователя.
        Это в основном обрабатывается на сервере, но нам также нужно сделать
        несколько вещей на стороне клиента, чтобы это завершить.
      </p>
      <p>
        Если учетные данные пользователя действительны, но срок действия токена
        доступа истек, сервер вернет ответ с кодом состояния <code>403</code>,
        а также сообщение <code>Unauthorized</code>. Если это произойдет,
        нам нужно попробовать обновить токен, сделав запрос к{' '}
        <code>/api/refreshToken</code>. Если <code>refreshToken</code> пользователя
        все еще действителен, мы получим новый токен доступа <code>token</code>,
        который мы сможем использовать вместо истекшего. Мы сможем сделать это
        до тех пор, пока <code>refreshToken</code> от сервера действителен.
      </p>
      <p>
        Мы подключим этот новый токен доступа <code>token</code> в исходный
        запрос через другой перехватчик, а также сохраним его в{' '}
        <code>AuthProvider</code> и отправим запрос дальше. Если{' '}
        <code>refreshToken</code> больше не действителен, то мы будем считать
        пользователя неавторизованным и перенаправим его на{' '}
        <code>SignInPage</code>.
      </p>
      <p>
        Нам нужно будет создать еще один перехватчик <code>axios</code> для этого,
        но на этот раз для ответа. Перехватчик будет проверять код состояния
        <code>status</code>, а также <code>message</code>, чтобы определить,
        нужно ли пытаться обновить токен. Если да, он вызовет конечную точку{' '}
        <code>/api/refreshToken</code>, чтобы получить новый токен доступа{' '}
        <code>token</code>.
      </p>
      <p>
        Если новый <code>token</code> возвращается, мы установим его в состоянии,
        а также в заголовках <code>originalRequest</code>. Нам также нужно будет
        установить пользовательскую переменную <code>_retry</code>, которую мы
        можем использовать в перехватчике запроса, чтобы предотвратить
        переопределение этого нового <code>token</code> перехватчиком запроса.
        Наконец, мы вызовем <code>originalRequest</code> и вернем его ответ.
      </p>
      <p>
        Если вызов API для обновления завершится неудачно, мы просто установим{' '}
        <code>token</code> в <code>null</code>, и пользователь автоматически
        будет перенаправлен на <code>SignInPage</code> нашим другим кодом.
      </p>
      <p>
        Нам нужно обновить компонент <code>AuthProvider</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          42, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
        ]}
        title='src/components/AuthProvider.jsx'
      >
        {authProviderWithResponseInterceptorCode}
      </CodeHighlighter>
    </div>
  );
};


const routeCode = `import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import { Spinner } from '@/components/ui';

const Route = ({ children, isProtected }) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (isProtected && token === null) {
      navigate('/signin', { replace: true });
    }
  }, [isProtected, navigate, token]);

  return token === undefined ? (
    <div className='absolute bottom-0 left-0 right-0 top-0 ml-[700px] flex items-center justify-center'>
      <Spinner />
    </div>
  ) : (
    children
  );
};

export default Route;`;

export const Step13 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>Route</code>
      </h2>
      <p>
        Поскольку мы включили аутентификацию в нашем приложении, нам нужно
        реализовать способ защиты наших маршрутов и позволить доступ к ним
        только вошедшим пользователям, так как запросы будут работать только для
        вошедших пользователей, а неавторизованные пользователи не должны иметь
        доступ к этим страницам.
      </p>
      <p>
        Для этого мы создадим пользовательский компонент <code>Route</code>,
        который будет перенаправлять пользователя на <code>SignInPage</code>, если
        он не вошел в систему. Мы обернем каждый из наших маршрутов в нашем{' '}
        <code>Router</code> с этим компонентом, чтобы, независимо от того,
        на какой странице находится пользователь, если он не вошел в систему,
        его перенаправят на <code>SignInPage</code>, и он не сможет получить
        доступ к другим страницам.
      </p>
      <p>
        Компонент будет принимать пропс <code>isProtected</code>, чтобы мы могли
        настраивать, должен ли маршрут быть защищен. Если он защищен, мы будем
        использовать функцию <code>navigate</code> для перенаправления пользователя
        и передадим <code>replace</code> как <code>true</code>, чтобы очистить
        историю и предотвратить возможность возврата пользователя назад.
      </p>
      <p>
        Важно отметить, что мы будем перенаправлять пользователя только в том
        случае, если мы пытались получить <code>token</code>, и он оказался
        недействительным. Поэтому нам нужно будет проверить на{' '}
        <code>null</code> в частности и перенаправлять на основе этого.
      </p>
      <p>
        Нам нужно будет создать новый файл в папке <code>src/components</code>{' '}
        с именем <code>Route.jsx</code> и следующим кодом:
      </p>
      <CodeHighlighter title='src/components/Route.jsx'>
        {routeCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithRouteCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Route from '@/components/Route';
import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignInPage from '@/pages/SignInPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/signin',
        element: (
          <Route>
            <SignInPage />
          </Route>
        ),
      },
      {
        path: '/',
        element: (
          <Route isProtected>
            <HomePage />
          </Route>
        ),
      },
      {
        path: '/listings/:listingId',
        element: (
          <Route isProtected>
            <ListingDetailsPage />
          </Route>
        ),
      },
      {
        path: '/favorites',
        element: (
          <Route isProtected>
            <ListingFavoritesPage />
          </Route>
        ),
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step14 = () => {
  return (
    <div>
      <h2>
        Обновление всех маршрутов с <code>Route</code>
      </h2>
      <p>
        Теперь, когда у нас есть компонент <code>Route</code>, нам нужно
        обновить все наши маршруты, чтобы использовать его. Мы обернем каждый
        из наших маршрутов в нашем <code>Router</code> и передадим{' '}
        <code>isProtected</code> тем маршрутам, которые мы хотим защитить
        для только вошедших пользователей.
      </p>
      <p>
        Поскольку мы поместили всю эту функциональность в один
        переиспользуемый компонент, если в будущем мы захотим добавить
        какую-либо дополнительную функциональность к нашим маршрутам, мы
        сможем легко сделать это через этот компонент <code>Route</code> и
        применить к всем маршрутам. Вот в чем сила React!
      </p>
      <p>
        Нам нужно будет обновить компонент <code>Router</code> с
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47]}
        title='src/Router.jsx'
      >
        {routerWithRouteCode}
      </CodeHighlighter>
    </div>
  );
};


const signInPageWithRedirectCode = `import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import SignInForm from '@/components/SignInForm';

const SignInPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]);

  return (
    <div className='container flex h-screen items-center justify-center py-4'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;`;

export const Step15 = () => {
  return (
    <div>
      <h2>
        Перенаправление на <code>/</code> после входа в систему
      </h2>
      <p>
        Следующий шаг заключается в том, чтобы перенаправить пользователя на
        домашнюю страницу после того, как он вошел в систему. Это обратное
        действие тому, что мы сделали в компоненте <code>Route</code>. И здесь
        мы сделаем что-то умное. Вместо того чтобы перенаправлять пользователя
        из функции <code>onSubmit</code> в <code>SignInForm</code> сразу после
        отправки формы, мы поместим этот код в компонент <code>SignInPage</code>.
      </p>
      <p>
        Причина, по которой мы хотим сделать это таким образом, заключается в
        том, что <code>SignInPage</code> не должна быть доступна, когда
        пользователь вошел в систему. Если мы перенаправим из функции{' '}
        <code>onSubmit</code>, то ничего не будет мешать пользователю
        вручную изменить URL браузера на <code>/signin</code> и получить
        доступ к странице.
      </p>
      <p>
        Если мы вместо этого обработаем перенаправление напрямую из{' '}
        <code>SignInPage</code>, то мы предотвратим доступ пользователя к
        странице во время входа в систему, а также автоматически перенаправим
        его, когда он войдет через <code>SignInForm</code>.
      </p>
      <p>
        Чтобы перенаправить пользователя, мы используем хук{' '}
        <code>useNavigate</code> из <code>react-router-dom</code>. Мы
        используем этот хук, чтобы получить функцию <code>navigate</code>, а
        затем используем хук <code>useEffect</code>, чтобы следить за
        изменениями состояния <code>token</code>. Если <code>token</code> имеет
        истинное значение, мы перенаправим пользователя на домашнюю страницу.
        Мы также используем параметр <code>replace</code>, чтобы удалить
        маршрут <code>/signin</code> из истории, чтобы пользователь не мог
        вернуться назад к нему.
      </p>
      <p>
        Это довольно похоже на то, что мы сделали с компонентом <code>Route</code>,
        но в обратном направлении. Мы могли бы добавить эту функциональность
        внутрь <code>Route</code>, но в данный момент у нас есть только одна
        такая страница, так что нормально поместить ее сюда.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>SignInPage</code> с
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 4, 8, 9, 11, 12, 13, 14, 15]}
        title='src/pages/SignInPage.jsx'
      >
        {signInPageWithRedirectCode}
      </CodeHighlighter>
    </div>
  );
};


const navBarWithSignOutCode = `import { Link } from 'react-router-dom';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';

const Navbar = () => {
  const { setToken } = useAuth();

  const handleSignOut = async () => {
    try {
      await api.post('/api/signout');

      setToken(null);
    } catch {
      setToken(null);
    }
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between gap-8 px-8 py-4'>
        <Link to='/'>Home</Link>
        <div className='flex-end flex flex-row items-center gap-8'>
          <Link to='/favorites'>Favorites</Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link>Account</Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;`;

export const Step16 = () => {
  return (
    <div>
      <h2>
        Создание кнопки выхода в <code>Navbar</code>
      </h2>
      <p>
        Последний шаг в нашей аутентификации — это возможность выхода пользователя
        из системы. Мы сделаем это, добавив кнопку в компонент <code>Navbar</code>,
        которая будет вызывать конечную точку <code>/api/signout</code> и
        выводить пользователя из системы.
      </p>
      <p>
        Единственное, что нам нужно сделать здесь, — это установить <code>token</code>
        в <code>null</code> после успешного ответа на выход, чтобы приложение
        знало, что пользователь вышел из системы. Установив <code>token</code> в{' '}
        <code>null</code>, приложение справится с остальным, поскольку мы
        настроили необходимые компоненты для этого.
      </p>
      <p>
        Мы добавим новый элемент в <code>Navbar</code> для кнопки выхода. Мы
        создадим выпадающее меню под названием "Аккаунт", в котором будет
        кнопка выхода. Это позволит нам в будущем добавлять больше элементов в
        это меню, если потребуется. Мы также обновим некоторые стили в{' '}
        <code>Navbar</code>, чтобы сделать его более привлекательным.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>Navbar</code> с
        следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24,
          28, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
        ]}
        title='src/components/Navbar.jsx'
      >
        {navBarWithSignOutCode}
      </CodeHighlighter>
    </div>
  );
};


export const Completed = () => {
  return (
    <div className='relative'>
      <CheckCircle className='mx-auto mb-8 h-40 w-40' />
      <h2>Модуль завершён!</h2>
      <p>
        Поздравляем! Вы успешно завершили 7-й модуль курса. Теперь у вас
        полностью работает аутентификация в приложении! Пользователи могут
        входить в систему, у них есть правильная валидация в форме входа, и
        они могут получать доступ только к защищённым частям приложения, если
        они вошли в систему.
      </p>
      <p>
        В этом модуле вы узнали, как создавать формы с помощью React Hook Form,
        как обрабатывать валидацию форм с помощью Zod, как настроить
        аутентификацию и провайдеров, а также как обрабатывать токены доступа и
        обновления!
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите <code>8-deploying</code>{' '}
        в выпадающем меню выше. Увидимся там!
      </p>
      <h3>Завершённые задачи</h3>
      <Separator className='mb-2' />
      <TaskList checked tasks={tasks} />
      <div className='absolute -top-6'>
        <Confetti
          numberOfPieces={200}
          recycle={false}
          height={window.innerHeight - 200}
          width={650}
        />
      </div>
    </div>
  );
};

