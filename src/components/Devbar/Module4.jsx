import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Настроить компонент <code>Router</code>',
  'Заменить <code>App</code> на <code>Router</code>',
  'Добавить <code>HomePage</code> как дочерний маршрут',
  'Добавить <code>Outlet</code> в <code>App</code>',
  'Создать компонент <code>ListingDetailsCard</code>',
  'Создать компонент <code>ListingDetailsPage</code>',
  'Добавить <code>ListingDetailsPage</code> в <code>Router</code>',
  'Добавить ссылку на детали в <code>ListingCard</code>',
  'Создать компонент <code>ListingDetailsCardImages</code>',
  'Добавить <code>ListingDetailsCardImages</code> в <code>ListingDetailsCard</code>',
  'Создать компонент <code>NotFoundPage</code>',
  'Добавить <code>NotFoundPage</code> в <code>router</code>',
];


export const Intro = () => {
  return (
    <div>
      <h2>Модуль 4 - Маршруты и навигация</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы будем работать с маршрутами и навигацией. Мы
        узнаем, как использовать <code>react-router-dom</code> для добавления
        навигации в наше приложение, затем создадим маршрутизатор, который
        будет содержать наши маршруты и структуру навигации для нашего
        приложения, и в конце добавим новые страницы, на которые смогут
        переходить пользователи.
      </p>
      <p>
        Этот модуль очень важен, поскольку мы кардинально изменим структуру
        нашего приложения. Мы заменим точку входа нашего приложения, которая
        в настоящее время рендерит один компонент, на рендеринг целого
        маршрутизатора!
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        В настоящее время все наши объявления не кликабельны. Мы показываем
        их все на главной странице и даже позволяем пользователю фильтровать
        их, но не даем возможности нажать на объявление, чтобы просмотреть
        дополнительную информацию о нем. Это не лучший пользовательский
        опыт.
      </p>
      <p>
        Мы можем улучшить это, создав новую страницу, которая будет
        отображать детали объявления. Пользователь сможет кликнуть на любое
        объявление и быть перенаправленным на эту страницу, а затем, когда
        они закончат, они должны иметь возможность вернуться на главную
        страницу через свой браузер. Это создаст гораздо лучший пользовательский
        опыт и сделает наше приложение более живым.
      </p>
      <p>
        Для этого нам нужно будет изучить навигацию в React и реализовать
        собственное решение для маршрутизации на стороне клиента. Мы будем
        делать это с библиотекой <code>react-router-dom</code>. Нам нужно будет
        создать наш собственный маршрутизатор, определить наши маршруты и
        структурировать способ, которым пользователи смогут навигировать по
        нашему приложению.
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


const routerCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Настройка компонента <code>Router</code>
      </h2>
      <p>
        Мы начнем с интеграции <code>react-router-dom</code> в наше приложение.
        Первый шаг - создать компонент <code>Router</code>, в котором мы
        определим наши маршруты и их структуру. Это станет новой точкой
        входа в наше приложение.
      </p>
      <p>
        Мы будем использовать функцию <code>createBrowserRouter</code> из{' '}
        <code>react-router-dom</code>, чтобы создать наш маршрутизатор. Внутри
        мы определим простой маршрут, <code>/</code>, который будет рендерить
        наш компонент <code>App</code>. Компонент <code>App</code> - это
        компонент, который в настоящее время рендерит наше приложение целиком,
        включая компонент <code>Devbar</code>, где вы сейчас читаете это.
        Маршрутизатор сопоставит индексный маршрут нашего приложения с
        компонентом <code>App</code>, и когда пользователь посещает эту
        страницу, она будет рендериться.
      </p>
      <p>
        Затем нам нужно будет создать компонент <code>Router</code>, который
        будет использовать <code>RouterProvider</code> из{' '}
        <code>react-router-dom</code> и передавать ему созданный нами{' '}
        <code>router</code>. Мы экспортируем этот компонент, чтобы затем
        использовать его для фактического рендеринга нашего маршрутизатора.
      </p>
      <p>
        Нам нужно будет создать новый файл в директории <code>src</code>
        с именем <code>Router.jsx</code> и следующим кодом:
      </p>
      <CodeHighlighter title='src/Router.jsx'>{routerCode}</CodeHighlighter>
    </div>
  );
};


const mainCode = `import ReactDOM from 'react-dom/client';

import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';

import Router from './Router';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Router />
  </ThemeProvider>,
);`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Замена <code>App</code> на <code>Router</code>
      </h2>
      <p>
        Теперь, когда мы создали компонент <code>Router</code>, нам нужно
        импортировать его и добавить его в качестве основной точки входа в наше
        приложение. Мы заменим <code>App</code> в методе <code>render</code> из{' '}
        <code>ReactDOM</code>, чтобы основной точкой входа в наше приложение
        стал наш маршрутизатор.
      </p>
      <p>
        С этими изменениями наш <code>Router</code> теперь контролирует
        все приложение и решает, что будет рендериться. Поскольку мы поместили
        компонент <code>App</code> внутри пути <code>/</code>, он будет
        автоматически рендериться через наш <code>Router</code> каждый раз,
        когда мы находимся на главной странице нашего приложения.
      </p>
      <p>
        Нам нужно будет обновить файл <code>main.jsx</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[6, 15]} title='src/main.jsx'>
        {mainCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithChildrenCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Добавление <code>HomePage</code> в качестве дочернего маршрута
      </h2>
      <p>
        Следующее, что нам нужно сделать, это позволить <code>App</code> рендерить
        динамическое содержимое. В текущем состоянии <code>App</code> не способен
        рендерить динамическое содержимое. Мы жестко закодировали{' '}
        <code>HomePage</code> внутри него. Мы должны изменить это, чтобы
        позволить рендерить любой компонент в зависимости от текущего URL.
        Мы также хотим сохранить тот же стиль, что и сейчас, а также рендерить
        динамическое содержимое только с правой стороны экрана, рядом с{' '}
        <code>Devbar</code>.
      </p>
      <p>
        К счастью, одной из замечательных функций <code>react-router-dom</code>{' '}
        является возможность иметь дочерние маршруты. Это позволит нам определить
        маршрут, который является дочерним к другому маршруту. Когда мы
        будем перемещаться к этому маршруту, будут рендериться как родительский,
        так и дочерний маршрут. Мы можем использовать <code>App</code> в качестве
        родительского маршрута и любой динамический маршрут в качестве дочернего.
      </p>
      <p>
        Для этого нам нужно будет добавить новый маршрут внутри{' '}
        <code>Router</code>, под свойством <code>children</code> индексового маршрута.
        Мы дадим ему тот же путь, <code>/</code>, и будем использовать компонент{' '}
        <code>HomePage</code>. Это рендерит все так, как у нас есть сейчас, но через
        дочерний маршрут в <code>Router</code>.
      </p>
      <p>
        Нам нужно будет обновить <code>router</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 11, 12, 13, 14, 15, 16]}
        title='src/Router.jsx'
      >
        {routerWithChildrenCode}
      </CodeHighlighter>
    </div>
  );
};


const appWithOutletCode = `import { Outlet } from 'react-router-dom';

import Devbar from '@/components/Devbar/Devbar';

const App = () => {
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
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
        Добавление <code>Outlet</code> в <code>App</code>
      </h2>
      <p>
        Следующее, что нам нужно сделать, это удалить <code>HomePage</code>{' '}
        внутри компонента <code>App</code> и заменить его нашим новым дочерним
        маршрутом. Поскольку мы теперь определили дочерний маршрут для{' '}
        <code>App</code>, нам нужно сказать{' '}
        <code>react-router-dom</code>, где рендерить дочерний маршрут.
      </p>
      <p>
        Для этого мы воспользуемся компонентом <code>Outlet</code> из{' '}
        <code>react-router-dom</code>. Этот компонент является местом, где{' '}
        <code>react-router-dom</code> будет динамически рендерить маршрут
        внутри содержимого другого маршрута. В нашем случае он будет рендерить
        любого потомка <code>App</code>.
      </p>
      <p>
        Мы заменим жестко закодированный <code>HomePage</code> на компонент{' '}
        <code>Outlet</code>, чтобы сохранить весь тот же стиль, что и прежде,
        а также чтобы <code>Devbar</code> был виден в любое время.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>App</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[1, 12]} title='src/App.jsx'>
        {appWithOutletCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsCardCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import { Card, Separator } from '@/components/ui';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{listing.location.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingDetailsCard</code>
      </h2>
      <p>
        Теперь, когда наш маршрутизатор настроен и работает с вложенными маршрутами, мы можем начать добавлять новые страницы в наше приложение. Мы уже говорили о добавлении страницы с деталями объявления, чтобы пользователь мог перейти к ней и увидеть больше информации о списке, так что давайте сделаем это!
      </p>
      <p>
        Первое, что нам нужно сделать, это создать компонент, чтобы показать некоторые детали объявления. Это будет очень похоже на компонент <code>ListingCard</code>, который мы создали ранее, но у него будет больше информации для отображения. Он также будет получать <code>listing</code> в качестве пропсов и просто рендерить интерфейс для объявления.
      </p>
      <p>
        Сначала мы начнем без изображений. Мы просто будем рендерить название <code>listing</code>, цену, местоположение, максимальное количество гостей и описание. На следующих шагах мы добавим изображения, так же как и в <code>ListingCard</code>.
      </p>
      <p>
        Нам нужно создать новый файл внутри <code>src/components</code> с именем <code>ListingDetailsCard.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingDetailsCard.jsx'>
        {listingDetailsCardCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsPageCode = `import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '@/api';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import { Spinner } from '@/components/ui';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const [listing, setListing] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortController = useRef(null);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get(${'`/api/listings/${listingId}`'}, {
          signal: abortController.current?.signal,
        });
        setListing(response.data);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();

    return () => {
      abortController.current?.abort();
    };
  }, [listingId]);

  const renderListing = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return <ListingDetailsCard listing={listing} />;
  };

  return <div className='container py-4'>{renderListing()}</div>;
};

export default ListingDetailsPage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingDetailsPage</code>
      </h2>
      <p>
        Далее, давайте создадим страницу с деталями объявления. Это будет компонент страницы, который мы подключим к нашему <code>router</code>, и он будет рендерить компонент <code>ListingDetailsCard</code>, который мы только что создали на предыдущем шаге.
      </p>
      <p>
        Поскольку наш компонент <code>ListingDetailsCard</code> нуждается в <code>listing</code> для отображения, нам нужно будет получить его на этой странице и передать дальше. Так же, как мы делали на <code>HomePage</code>, нам нужно будет получить объявление в <code>useEffect</code>, а также обработать состояния загрузки и ошибки и управлять условиями гонки.
      </p>
      <p>
        Чтобы получить правильное объявление, нам нужно знать <code>listingId</code>, чтобы его получить. Конечная точка API для получения одного объявления требует его. Мы можем использовать параметры в <code>react-router-dom</code>. Параметры позволяют нам передавать данные от одного маршрута к другому. Это позволит нам передать <code>listingId</code> в этот маршрут, когда мы будем к нему переходить.
      </p>
      <p>
        Чтобы получить доступ к <code>listingId</code> и любым другим параметрам, мы можем использовать хук <code>useParams</code> из <code>react-router-dom</code>. Это даст нам доступ к любым параметрам, которые были переданы в этот маршрут.
      </p>
      <p>
        Нам нужно создать новый файл внутри <code>src/pages</code> с именем <code>ListingDetailsPage.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/pages/ListingDetailsPage.jsx'>
        {listingDetailsPageCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithListingsDetailsCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Добавление <code>ListingDetailsPage</code> в <code>Router</code>
      </h2>
      <p>
        Теперь, когда мы создали <code>ListingDetailsPage</code>, мы можем добавить его в наш <code>router</code>, чтобы он был доступен в нашем приложении. Мы захотим отобразить этот маршрут как дочерний маршрут нашего индексного маршрута, прямо рядом с <code>HomePage</code>. Это гарантирует, что навигация происходит только между дочерними маршрутами, при этом <code>App</code> остается отображенным с компонентом <code>Devbar</code>.
      </p>
      <p>
        Путь для страницы деталей объявления будет содержать динамический параметр URL, <code>listingId</code>. Путь будет <code>/listings/:listingId</code>, который будет соответствовать любому <code>listingId</code>, который мы предоставим. Таким образом, мы получим доступ к <code>listingId</code> через параметры маршрута, которые мы получили с помощью <code>useParams</code> на предыдущем шаге.
      </p>
      <p>
        Важно понимать взаимосвязь между различными маршрутами и их путями. В настоящее время мы поместили <code>ListingDetailsPage</code> под основной индексный путь <code>/</code>, где находится <code>App</code>, и затем указали <code>/listings/:listingId</code> как путь. Первый путь применяется к компоненту <code>App</code>, который должен отображаться на любом маршруте, так как он содержит основной макет нашего приложения. Компонент <code>ListingDetailsPage</code>, однако, должен отображаться только на <code>/listings/:listingId</code>. В результате на каждой странице будет отображаться <code>App</code>, а любой подмаршрут, который мы определили, будет отображать соответствующий компонент внутри <code>Outlet</code> компонента <code>App</code>.
      </p>
      <p>
        Нам нужно обновить файл <code>Router.jsx</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[4, 17, 18, 19, 20]}
        title='src/Router.jsx'
      >
        {routerWithListingsDetailsCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardWithLinkCode = `import { DollarSign, Pin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Link to={${'`/listings/${listing.id}`'}}>
      <Card className='w-[320px]'>
        <ListingCardImages listing={listing} />
        <CardContent className='flex flex-col gap-2 p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{listing.price}</span>{' '}
              / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.location.name}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              {listing.maxGuests} Guests
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Добавление ссылки на детали в <code>ListingCard</code>
      </h2>
      <p>
        Последнее, что нам нужно сделать, это создать ссылку от компонента{' '}
        <code>ListingCard</code> к <code>ListingDetailsPage</code>. Это сделает
        каждое объявление на нашей главной странице кликабельным и перенаправит
        пользователя на страницу деталей. Поскольку у нас есть доступ к{' '}
        <code>listing</code> внутри <code>ListingCard</code>, мы можем использовать
        это для передачи правильного <code>listingId</code> в URL.
      </p>
      <p>
        При использовании <code>react-router-dom</code> нам нужно использовать{' '}
        <code>Link</code> компонент вместо HTML тега <code>a</code> для создания
        ссылки. Это позволит нам реализовать маршрутизацию на стороне клиента, что
        не перезагрузит страницу, как это сделает обычный тег <code>a</code>.{' '}
        Компонент <code>Link</code> принимает свойство <code>to</code>, которое
        соответствует <code>href</code> в обычной ссылке. Мы можем передать
        относительную ссылку и использовать интерполяцию строк для передачи{' '}
        <code>listingId</code>.
      </p>
      <p>
        Вы заметите, что мы решили сделать так, чтобы <code>Link</code> оборачивал
        весь компонент <code>ListingCard</code>. Это сделано для того, чтобы
        вся карточка становилась кликабельной, как вы и ожидали бы в
        нормальном приложении. Однако мы могли бы сделать это и иначе, например,
        создав кнопку и сделав кликабельной только ее. В любом случае это нормально,
        и это полностью вопрос предпочтений на этом этапе.
      </p>
      <p>
        Нам нужно обновить компонент <code>ListingCard</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[2, 9, 35]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithLinkCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsCardImagesCode = `import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingDetailsCardImages = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <img
        className='mb-4 h-[500px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[currentImageIndex])}
        alt={listing.name}
      />
      <Carousel className='mx-auto mb-4 w-[90%]'>
        <CarouselContent>
          {listing.images.map((image, index) => (
            <CarouselItem
              key={image}
              className='basis-1/3 cursor-pointer'
              onClick={() => setCurrentImageIndex(index)}
              isSelected={index === currentImageIndex}
            >
              <img
                className='h-52 w-full object-cover shadow-sm'
                src={getImageUrl(image)}
                alt={listing.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ListingDetailsCardImages;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingDetailsCardImages</code>
      </h2>
      <p>
        Отлично! Наша маршрутизация работает как ожидалось, и мы можем
        кликнуть на любое объявление, чтобы перейти на страницу его деталей. Теперь
        давайте завершим компонент <code>ListingDetailsCard</code> и добавим к
        нему изображения. Точно так же, как мы сделали для изображений{' '}
        <code>ListingCard</code>, мы создадим новый компонент под названием{' '}
        <code>ListingDetailsCardImages</code>, который будет отвечать за
        отображение изображений объявления.
      </p>
      <p>
        <code>ListingDetailsCardImages</code> будет использовать тот же{' '}
        <code>Carousel</code>, который мы использовали в{' '}
        <code>ListingCardImages</code>, но также будет отслеживать текущий индекс
        изображения и отображать изображение в большем размере. Это позволит
        пользователю кликнуть на любое изображение и увидеть его в большом
        размере, а также просматривать изображения, используя карусель.
      </p>
      <p>
        Нам нужно создать переменную состояния под названием{' '}
        <code>currentIndex</code>, чтобы хранить текущее выбранное изображение.
        Затем мы передадим <code>setCurrentIndex</code> в обработчик события{' '}
        <code>onClick</code> у <code>CarouselItem</code>, устанавливая текущий
        индекс на индекс нажатого изображения.
      </p>
      <p>
        Нам нужно создать новый файл внутри <code>src/components</code>{' '}
        с именем <code>ListingDetailsCardImages.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingDetailsCardImages.jsx'>
        {listingDetailsCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};


const listingDetailsCardWithListingDetailsCardImagesCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import { Card, Separator } from '@/components/ui';

const ListingDetailsCard = ({ listing }) => {
  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages listing={listing} />
      <Separator className='mb-4' />
      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl font-bold'>{listing.name}</h1>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{listing.location.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{listing.description}</div>
    </Card>
  );
};

export default ListingDetailsCard;`;

export const Step10 = () => {
  return (
    <div>
      <h2>
        Добавление <code>ListingDetailsCardImages</code> в{' '}
        <code>ListingDetailsCard</code>
      </h2>
      <p>
        Теперь, когда у нас есть компонент <code>ListingDetailsCardImages</code>,
        нам нужно добавить его в наш компонент <code>ListingDetailsCard</code>,
        чтобы показать все изображения. Мы добавим его прямо в верхнюю часть
        карточки, чтобы это было первым, что видит пользователь, когда он
        переходит на страницу деталей.
      </p>
      <p>
        Нам нужно импортировать компонент <code>ListingDetailsCardImages</code>
        и отобразить его внутри компонента <code>ListingDetailsCard</code>,
        передав ему <code>listing</code> как пропс. Мы также добавим{' '}
        <code>Separator</code> с небольшим отступом, чтобы сделать внешний вид
        приятнее.
      </p>
      <p>
        Нам нужно обновить компонент <code>ListingDetailsCard</code> со следующим
        кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 9, 10]}
        title='src/components/ListingDetailsCard.jsx'
      >
        {listingDetailsCardWithListingDetailsCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};


const notFoundPageCode = `import { Link } from 'react-router-dom';

import { Button, Card } from '@/components/ui';

const NotFoundPage = () => {
  return (
    <div className='container flex h-screen w-screen items-center justify-center py-4 text-center'>
      <Card className='p-8'>
        <h1>Page not found</h1>
        <p className='pb-2'>
          Unfortunately, the page that you're looking for does not exist.
        </p>
        <Button asChild>
          <Link to='/' replace>
            Back to Home
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;`;

export const Step11 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>NotFoundPage</code>
      </h2>
      <p>
        Отлично! Наша страница деталей объявления готова! Теперь давайте
        вернемся к нашему маршрутизатору, потому что у нас есть еще одно дело
        для нашей программы. Вы заметите, что если мы вручную изменим URL в
        браузере на что-то другое, кроме того, что мы настроили, мы получаем
        некрасивую ошибку. Это не лучший пользовательский опыт, и нам нужно это
        исправить.
      </p>
      <p>
        Способ, которым мы можем это исправить с помощью <code>react-router-dom</code>,
        заключается в том, что нам нужно предоставить резервный компонент на случай,
        если текущий URL не соответствует ни одному действительному маршруту,
        который в настоящее время только <code>/</code> и <code>/listings/:listingId</code>.
        Мы можем создать общий компонент страницы <code>NotFoundPage</code>, чтобы
        отобразить некоторый пользовательский интерфейс для пользователей, которые
        попадают на эту страницу.
      </p>
      <p>
        На этой странице мы также должны добавить кнопку для возврата на домашнюю
        страницу, чтобы облегчить пользователям поиск пути обратно. Мы снова
        используем компонент <code>Link</code>, чтобы отправить наших пользователей
        на домашнюю страницу. Мы также передадим <code>replace</code> в качестве
        пропса для <code>Link</code>, чтобы вся история заменилась и пользователи
        не могли вернуться на страницу ошибки.
      </p>
      <p>
        Нам нужно создать новый файл в <code>src/pages</code> под названием{' '}
        <code>NotFoundPage.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/pages/NotFoundPage.jsx'>
        {notFoundPageCode}
      </CodeHighlighter>
    </div>
  );
};


const routerWithNotFoundPageCode = `import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;`;

export const Step12 = () => {
  return (
    <div>
      <h2>
        Добавление <code>NotFoundPage</code> в <code>router</code>
      </h2>
      <p>
        Теперь, когда у нас есть наш компонент <code>NotFoundPage</code>,
        нам нужно подключить его к нашему <code>router</code>, чтобы он
        служил запасным вариантом для любого маршрута, который не обрабатывается.
        Для этого мы воспользуемся свойством <code>errorElement</code>.
      </p>
      <p>
        С помощью <code>react-router-dom</code> мы можем легко передать любой
        компонент, чтобы он служил запасным вариантом для ошибок. Это означает,
        что когда наши пользователи перейдут на страницу, которая не настроена,
        вместо того, чтобы показывать эту некрасивую ошибку,{' '}
        <code>react-router-dom</code> будет отображать этот компонент.
      </p>
      <p>
        Все, что нам нужно сделать, это передать <code>NotFoundPage</code> в
        качестве <code>errorElement</code> в нашем маршрутизаторе, под основным
        индексным маршрутом <code>/</code>. Это будет обрабатывать все наши
        ошибки на любом маршруте. После этого мы сможем ввести любой недействительный
        URL, и мы всегда увидим этот компонент, что является гораздо лучшим
        пользовательским опытом.
      </p>
      <p>
        Нам нужно обновить компонент <code>Router</code> следующим кодом:
      </p>
      <CodeHighlighter highlightedLines={[5, 13]} title='src/Router.jsx'>
        {routerWithNotFoundPageCode}
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
        Поздравляем! Вы успешно завершили 4-й модуль курса. Теперь вы
        можете перемещаться между главной страницей и страницей деталей
        списка, щелкая по любому списку!
      </p>
      <p>
        В этом модуле мы узнали, как работать с{' '}
        <code>react-router-dom</code>, как создать маршрутизатор с
        помощью <code>createBrowserRouter</code> и передать его в наше
        приложение через <code>RouterProvider</code>, мы узнали, как
        перемещаться между маршрутами и передавать параметры, а также
        научились создавать наш собственный компонент "страница не найдена"
        для отображения.
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>5-hooks-and-performance</code> из выпадающего списка
        выше. Увидимся там!
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

