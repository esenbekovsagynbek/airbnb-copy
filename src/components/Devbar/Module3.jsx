import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Подготовить <code>HomePage</code> для получения данных',
  'Получить списки в <code>HomePage</code>',
  'Добавить состояние загрузки в <code>HomePage</code>',
  'Добавить состояние ошибки в <code>HomePage</code>',
  'Добавить фильтры в <code>HomePage</code>',
  'Реализовать AbortController в <code>HomePage</code>',
  'Обновить <code>ListingCard</code> с новыми данными',
  'Создать компонент <code>ListingCardImages</code>',
  'Обновить <code>ListingCard</code> с <code>ListingCardImages</code>',
];


export const Intro = () => {
  return (
    <div>
      <h2>Модуль 3 - Эффекты и Получение Данных</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы будем работать с эффектами и получением данных. Мы
        изучим <code>useEffect</code> и его работу, узнаем о массивах зависимостей,
        а также о жизненном цикле эффекта в компоненте React.
      </p>
      <p>
        Мы также научимся получать данные из API, используя{' '}
        <code>useEffect</code>. Мы узнаем, как управлять своими состояниями загрузки
        и ошибок, а также как предотвратить гонки условий при нескольких запросах,
        выполняемых в разное время!
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        В настоящее время, хотя наши <code>listings</code> в <code>HomePage</code>
        имеют состояние, данные напрямую импортируются из статического списка,
        определенного в <code>src/api/data/listings</code>. Кроме того, когда мы
        применяем наши фильтры к <code>listings</code>, мы фактически фильтруем
        только статический список, импортированный ранее. Нам нужно это изменить.
      </p>
      <p>
        Следующий шаг для нас - получить эти данные из API. Это то, как
        большинство React-приложений работают в реальном мире, поэтому полезно
        знать, как это делать. Для получения данных мы будем использовать
        пользовательский обертку вокруг <code>axios</code>, которая доступна в
        проекте в папке <code>api</code>.
      </p>
      <p>
        Важно отметить, что <code>api</code>, доступный в нашем приложении, является
        мок API. Это значит, что мы будем работать с ним и вызывать его, как в
        реальном приложении, но все данные будут смоделированы. Данные будут
        вместо этого поступать из <code>localStorage</code>, который инициализируется
        из того же статического списка <code>listings</code>, который мы использовали
        до сих пор. Мы делаем это, потому что у нас нет бэкенда для этого
        приложения, поэтому мы вместо этого создаем его в виде мока. Но это
        замечательно, потому что мы получаем все преимущества работы с API,
        не реализуя свой собственный бэкенд!
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


const homePagePreparedForFetchingCode = `import { useState } from 'react';

import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  const handleFilters = (filters) => {
    // Will implement later
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Подготовка <code>HomePage</code> для получения данных
      </h2>
      <p>
        Первое, что нам нужно сделать, это удалить{' '}
        <code>staticListings</code> из <code>HomePage</code>, так как мы больше
        не будем использовать их напрямую. Мы подготовим{' '}
        <code>HomePage</code> для получения <code>listings</code> из мок API.
        Затем мы установим начальное состояние <code>listings</code> как пустой
        массив. Это приведет к исчезновению <code>listings</code> из UI на
        данный момент, но не беспокойтесь, мы добавим их обратно на
        следующем этапе.
      </p>
      <p>
        Затем нам также нужно будет удалить нашу реализацию{' '}
        <code>handleFilters</code>, так как фильтрация больше не будет
        происходить в компоненте <code>HomePage</code>. На следующих этапах мы
        реализуем фильтрацию, отправив данные в API. На данный момент мы
        оставим функцию <code>handleFilters</code> пустой с комментарием, чтобы
        напомнить нам, что мы должны реализовать ее позже.
      </p>
      <p>
        Нам нужно обновить компонент <code>HomePage</code> с помощью следующего
        кода:
      </p>
      <CodeHighlighter
        highlightedLines={[8, 11]}
        title='src/pages/HomePage.jsx'
      >
        {homePagePreparedForFetchingCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithFetchingCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await api.get('/api/listings');
      setListings(response.data);
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Получение списков в <code>HomePage</code>
      </h2>
      <p>
        Теперь, когда наш <code>HomePage</code> готов для получения данных, мы
        можем начать добавлять код, который это обеспечит. Мы будем обрабатывать
        получение данных с помощью <code>useEffect</code>, и нам нужно будет
        реализовать функцию для получения списков. Мы определим эту функцию внутри
        <code>useEffect</code> и вызовем ее, когда <code>HomePage</code>{' '}
        будет смонтирован. Мы назовем ее <code>fetchListings</code>, чтобы было
        понятно, что она делает.
      </p>
      <p>
        Причина определения <code>fetchListings</code> внутри{' '}
        <code>useEffect</code> вместо снаружи заключается в том, чтобы не
        приходилось добавлять ее в массив зависимостей. Всегда хорошая идея
        ограничивать количество зависимостей, которые вы передаете в{' '}
        <code>useEffect</code>.
      </p>
      <p>
        Функция <code>fetchListings</code> будет использовать наш обертку{' '}
        <code>api</code> и вызывать конечную точку <code>/api/listings</code>,
        чтобы получить все списки. Это стандартный способ получения данных из API,
        и наш мок <code>api</code> позволяет делать это так, как будто мы
        получаем данные из реального API.
      </p>
      <p>
        Как только мы получим ответ от API, мы обновим{' '}
        <code>listings</code>, вызвав функцию <code>setListings</code> с
        свойством <code>response.data</code>. Это перерисует наш компонент и
        покажет полученные списки на экране.
      </p>
      <p>
        Нам нужно обновить компонент <code>HomePage</code> с помощью следующего
        кода:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 11, 12, 13, 14, 15, 16, 17, 18]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithFetchingCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithLoadingCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);

      const response = await api.get('/api/listings');
      setListings(response.data);

      setIsLoading(false);
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
  };

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Добавление состояния загрузки в <code>HomePage</code>
      </h2>
      <p>
        Отлично! Наши списки теперь извлекаются из API и корректно отображаются на
        главной странице. Однако есть небольшая ошибка в пользовательском интерфейсе.
        На данный момент пользователь видит сообщение "Нет списков." до тех пор,
        пока запрос не вернет данные, что не является хорошим пользовательским
        опытом. Нам нужно сделать что-то, чтобы сообщить пользователю, что списки
        загружаются.
      </p>
      <p>
        Для этого нам нужно создать и отслеживать собственное состояние загрузки.
        Мы сделаем это с помощью переменной, называемой <code>isLoading</code>. Мы
        установим ее в <code>true</code> изначально, когда наш компонент будет
        смонтирован, а затем в <code>false</code>, когда запрос вернет данные.
        Поскольку мы будем разрешать множественные запросы во время жизненного
        цикла этого компонента, нам также нужно будет убедиться, что мы снова
        устанавливаем <code>isLoading</code> в <code>true</code> каждый раз, когда
        вызывается функция <code>fetchListings</code>.
      </p>
      <p>
        Чтобы упростить отображение другого пользовательского интерфейса в
        зависимости от состояния загрузки, мы примем паттерн, который часто
        используется в React. Мы создадим функцию, называемую{' '}
        <code>renderListingList</code>, которая будет возвращать JSX, который мы
        хотим отобразить. Мы можем настроить ее так, чтобы она возвращала компонент{' '}
        <code>Spinner</code> пока <code>isLoading</code> равно{' '}
        <code>true</code>, в противном случае возвращала компонент{' '}
        <code>ListingList</code>.
      </p>
      <p>
        Нам нужно обновить компонент <code>HomePage</code> с помощью следующего
        кода:
      </p>
      <CodeHighlighter
        highlightedLines={[
          6, 10, 14, 19, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 47,
        ]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithLoadingCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithErrorCode = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/listings');
        setListings(response.data);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    // Will implement later
  };

  const renderListingList = () => {
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

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Добавление состояния ошибки в <code>HomePage</code>
      </h2>
      <p>
        Наше приложение теперь намного более удобное для пользователя! Однако
        еще есть одна вещь, которую нам нужно сделать. Что произойдет, если API
        не работает? Или если произошла ошибка с нашим запросом? В настоящее
        время наше приложение будет вызывать сбой, и у пользователя не будет
        представления о том, что произошло. Нам нужно обработать состояние
        ошибки нашего запроса.
      </p>
      <p>
        Так же, как мы создали переменную состояния <code>isLoading</code> для
        отслеживания состояния загрузки, нам нужно будет создать переменную
        состояния <code>error</code> для нашей ошибки. Если что-то пойдет не так
        с нашим запросом, мы установим <code>error</code> в состояние и
        используем его, чтобы показать пользователю некоторый интерфейс. Таким
        образом, независимо от того, что произойдет, пользователь всегда будет
        видеть что-то, и приложение не будет аварийно завершаться.
      </p>
      <p>
        Чтобы сделать это, нам нужно переместить наш код извлечения данных внутрь
        блока try-catch, чтобы мы могли поймать ошибку, если что-то пойдет не
        так. Нам также нужно помнить о сбросе состояния ошибки каждый раз, когда
        мы вызываем функцию <code>fetchListings</code>, так как новый запрос
        должен очищать предыдущую ошибку. Если произойдет ошибка, мы просто
        установим сообщение "Что-то пошло не так. Пожалуйста, попробуйте позже." в
        состояние <code>error</code>.
      </p>
      <p>
        Нам нужно обновить компонент <code>HomePage</code> с помощью следующего
        кода:
      </p>
      <CodeHighlighter
        highlightedLines={[11, 16, 18, 19, 20, 21, 22, 23, 24, 25, 44, 45, 46]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithErrorCode}
      </CodeHighlighter>
    </div>
  );
};


const homePageFetchWithFilters = `import { useEffect, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/listings', { params: filters });
        setListings(response.data);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  const renderListingList = () => {
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

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Добавление фильтров в <code>HomePage</code>
      </h2>
      <p>
        Теперь, когда наша функция <code>fetchListings</code> работает, мы можем
        начать повторно реализовывать фильтры, которые мы убрали на первом
        шаге. Фильтры теперь будут храниться в состоянии в <code>HomePage</code> и
        передаваться в функцию <code>fetchListings</code>. Это упрощает нашу
        задачу, потому что нам больше не нужно беспокоиться о фильтрации
        списков самостоятельно. Макет API позаботится об этом за нас, и все,
        что нам нужно сделать, это передать ему необходимые данные.
      </p>
      <p>
        Нам нужно создать новую переменную состояния под названием <code>filters</code>.
        Это будет объект с тремя свойствами, которые мы имели ранее:{' '}
        <code>dates</code>, <code>guests</code> и <code>search</code>. Мы
        установим начальное состояние на <code>undefined</code> для{' '}
        <code>dates</code>, <code>0</code> для <code>guests</code> и пустую
        строку для <code>search</code>. Затем мы передадим эти фильтры в нашу
        функцию <code>fetchListings</code> в качестве параметров.
      </p>
      <p>
        Поскольку мы теперь используем <code>filters</code> в нашей функции{' '}
        <code>fetchListings</code> внутри <code>useEffect</code>, нам нужно
        добавить его в массив зависимостей <code>useEffect</code>. Все, что
        используется внутри <code>useEffect</code>, должно быть в его массиве
        зависимостей. Это приведет к тому, что функция <code>fetchListings</code>
        будет повторно запускаться каждый раз, когда{' '}
        <code>filters</code> изменяется, что нам и нужно.
      </p>
      <p>
        Наконец, нам нужно повторно реализовать нашу функцию{' '}
        <code>handleFilters</code>, которая, к счастью для нас, будет
        действительно простой теперь! Единственное, что нам нужно сделать, это
        установить фильтры, которые мы получаем от компонента{' '}
        <code>ListingFilters</code>, в состояние{' '}
        <code>HomePage</code>. Поскольку мы добавили <code>filters</code> в
        массив зависимостей нашего <code>useEffect</code>, функция{' '}
        <code>fetchListings</code> будет автоматически вызываться всякий раз,
        когда они изменяются.
      </p>
      <p>
        Нам нужно обновить компонент <code>HomePage</code> с помощью следующего
        кода:
      </p>
      <CodeHighlighter
        highlightedLines={[12, 13, 14, 15, 16, 24, 34, 37]}
        title='src/pages/HomePage.jsx'
      >
        {homePageFetchWithFilters}
      </CodeHighlighter>
    </div>
  );
};


const homePageWithAbortControllerCode = `import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const abortController = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);

      abortController.current = new AbortController();

      try {
        const response = await api.get('/api/listings', {
          params: filters,
          signal: abortController.current?.signal,
        });
        setListings(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();

    return () => {
      abortController.current?.abort();
    };
  }, [filters]);

  const handleFilters = (filters) => {
    setFilters(filters);
  };

  const renderListingList = () => {
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

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;`;

export const Step6 = () => {
  return (
    <div>
      <h2>
        Реализация <code>AbortController</code> в <code>HomePage</code>
      </h2>
      <p>
        Наша загрузка данных почти завершена. Однако у нас есть еще один
        недостающий элемент. Давайте подумаем о другом сценарии, который
        может произойти. В данный момент, когда компонент <code>HomePage</code>
        монтируется, он сразу же вызывает функцию <code>fetchListings</code> для
        получения первой партии <code>listings</code>. Что произойдет, если
        пользователь изменит <code>filters</code> до того, как этот запрос
        вернется?
      </p>
      <p>
        Как мы это реализовали сейчас, вторая функция <code>fetchListings</code>
        будет вызвана, потому что изменение фильтров приведет к повторному
        рендерингу в <code>useEffect</code>. Это означает, что у нас будут
        одновременно выполняться 2 запроса, что не хорошо. Еще хуже, если
        первый запрос задержится по какой-либо причине и вернется после
        второго, он перезапишет результаты второго, что приведет к несоответствию
        интерфейса с данными. Это называется состоянием гонки, и нам нужно его
        предотвратить.
      </p>
      <p>
        Мы предотвратим это, убедившись, что любой незавершенный запрос
        отменяется перед тем, как будет запущен новый. Это гарантирует, что у нас
        всегда будет только один запрос в полете и что мы всегда будем видеть
        самые актуальные результаты.
      </p>
      <p>
        Для этого мы будем использовать <code>AbortController</code>, который
        мы можем использовать для отмены запроса. Нам нужно будет хранить это в
        компоненте. Однако, поскольку мы не показываем контроллер нигде в UI,
        мы можем сохранить его в рефе через хук <code>useRef</code>, чтобы
        избежать повторного рендеринга нашего компонента каждый раз, когда он
        изменяется.
      </p>
      <p>
        Все это будет выполнено в <code>useEffect</code>. Перед каждым запросом
        мы установим новый <code>AbortController</code> в нашем рефе, затем
        передадим его объект <code>signal</code> в наш запрос, а затем в функции
        очистки эффекта вызовем функцию <code>abort</code> для отмены запроса.
        Это означает, что каждый раз, когда мы повторно запускаем эффект
        обновлением <code>filters</code>, мы сначала отменим предыдущий запрос
        через функцию очистки, и у нас всегда будет новый контроллер отмены для
        нашего нового запроса.
      </p>
      <p>
        Важно отметить, что наш <code>api</code>, и, следовательно,{' '}
        <code>axios</code> под капотом, выбросит ошибку каждый раз, когда запрос
        отменяется. Это означает, что эта ошибка будет перехвачена в блоке{' '}
        <code>catch</code> нашего кода. В этом случае мы не хотим устанавливать
        ошибку в нашем состоянии, мы хотим ее игнорировать. Для этого нам нужно
        будет импортировать <code>axios</code> и использовать функцию{' '}
        <code>isCancel</code> для ошибки перед установкой состояния. Если
        ошибка вызвана отменой, мы игнорируем ее.
      </p>
      <p>
        Нам нужно обновить компонент <code>HomePage</code> с помощью следующего
        кода:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 2, 19, 26, 31, 34, 35, 36, 37, 46, 47, 48]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithAbortControllerCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardWithNewDataCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <img
        className='h-[200px] w-full rounded-md object-cover'
        src={getImageUrl(listing.images[0])}
        alt={listing.name}
      />
      <CardContent className='flex flex-col gap-2 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
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
      </CardContent>
    </Card>
  );
};

export default ListingCard;`;

export const Step7 = () => {
  return (
    <div>
      <h2>
        Обновление <code>ListingCard</code> с новыми данными
      </h2>
      <p>
        Теперь, когда мы завершили загрузку данных, мы можем внести некоторые
        изменения в компонент <code>ListingCard</code>, чтобы использовать их.
        Поскольку мы теперь получаем наши <code>listings</code> из{' '}
        <code>api</code>, у нас есть доступ к некоторым дополнительным данным,
        которых раньше у нас не было. Это потому, что <code>api</code> на самом
        деле будет манипулировать каждым <code>listing</code> и добавлять к нему
        некоторые связанные данные перед тем, как вернуть его.
      </p>
      <p>
        Мы собираемся добавить больше деталей в компонент <code>ListingCard</code>
        для использования этих данных. Мы покажем цену <code>listing</code>,
        местоположение, максимальное количество гостей, а в следующих шагах
        также добавим все оставшиеся изображения в карусель изображений.
      </p>
      <p>
        Для этого нам сначала нужно будет импортировать и использовать несколько
        компонентов из папки <code>src/components/ui</code>. Мы также будем
        использовать новые иконки из <code>lucide-react</code>. С их помощью
        мы добавим больше деталей в <code>CardContent</code> компонента{' '}
        <code>ListingCard</code>.
      </p>
      <p>
        Нам нужно обновить компонент <code>ListingCard</code> с помощью
        следующего кода:
      </p>
      <CodeHighlighter
        highlightedLines={[
          1, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 32,
        ]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithNewDataCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardImagesCode = `import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCardImages = ({ listing }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Carousel
      className='w-full'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CarouselContent className='ml-0'>
        {listing.images.map((image, index) => (
          <CarouselItem key={image} className='pl-0'>
            <img
              className='h-[200px] w-full rounded-md object-cover'
              src={getImageUrl(image)}
              alt={\`\${listing.name} Image \${index + 1}\`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {isHovering && (
        <>
          <CarouselPrevious className='absolute left-4' />
          <CarouselNext className='absolute right-4' />
        </>
      )}
    </Carousel>
  );
};

export default ListingCardImages;`;

export const Step8 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingCardImages</code>
      </h2>
      <p>
        Следующее, что нам нужно сделать, это улучшить отображение
        изображений списка. В настоящее время отображается только первое
        изображение, а остальные игнорируются. Мы собираемся изменить это,
        добавив красивую карусель изображений в компонент <code>ListingCard</code>.
      </p>
      <p>
        Мы создадим новый компонент для этого, который назовем{' '}
        <code>ListingCardImages</code>. Этот компонент будет использовать{' '}
        <code>Carousel</code> из папки <code>src/components/ui</code> и будет
        отображать все изображения списка.
      </p>
      <p>
        Этот компонент будет принимать <code>listing</code> в качестве
        пропса и использовать его для перебора каждого изображения и
        отображения карусели. Мы будем использовать тот же тег <code>img</code>,
        что и ранее для каждого элемента, но интегрируем его в компонент{' '}
        <code>CarouselItem</code>.
      </p>
      <p>
        Мы также хотим отобразить некоторые кнопки для навигации между
        различными изображениями. Эти кнопки будут использовать компоненты{' '}
        <code>CarouselPrevious</code> и <code>CarouselNext</code>. Все они
        будут работать вместе, потому что <code>Carousel</code> является
        составным компонентом, и каждый из этих компонентов принадлежит ему.
      </p>
      <p>
        Последнее, что нам нужно сделать, это показывать кнопки «Назад» и
        «Вперед» только в том случае, если пользователь в настоящее время
        наводит курсор на карусель. Таким образом, мы сохраняем чистоту
        нашего интерфейса, не теряя функциональности. Для этого нам нужно
        создать новую переменную состояния, называемую <code>isHovering</code>,
        и обновить её, используя обработчики событий <code>onMouseEnter</code>
        и <code>onMouseLeave</code> на компоненте <code>Carousel</code>.
      </p>
      <p>
        Нам нужно создать новый файл в директории <code>src/components</code>{' '}
        с именем <code>ListingCardImages.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingCardImages.jsx'>
        {listingCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};


const listingCardWithListingCardImagesCode = `import { DollarSign, Pin, Users } from 'lucide-react';

import ListingCardImages from '@/components/ListingCardImages';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <ListingCardImages listing={listing} />
      <CardContent className='flex flex-col gap-2 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
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
      </CardContent>
    </Card>
  );
};

export default ListingCard;`;

export const Step9 = () => {
  return (
    <div>
      <h2>
        Обновление <code>ListingCard</code> с помощью <code>ListingCardImages</code>
      </h2>
      <p>
        Последнее, что нам нужно сделать, это добавить наш новый{' '}
        <code>ListingCardImages</code> компонент в <code>ListingCard</code>, чтобы
        показать наш карусель изображений. Мы сделаем это, импортировав{' '}
        <code>ListingCardImages</code> компонент и отобразив его внутри{' '}
        <code>ListingCard</code> компонента.
      </p>
      <p>
        Мы заменим существующий тег <code>img</code>, который у нас был ранее для
        первого изображения, и будем использовать компонент <code>ListingCardImages</code>
        вместо него. Нам нужно будет передать ему <code>listing</code> в качестве
        пропсов, чтобы он работал правильно.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingCard</code> с помощью
        следующего кода:
      </p>
      <CodeHighlighter
        highlightedLines={[3, 9]}
        title='src/components/ListingCard.jsx'
      >
        {listingCardWithListingCardImagesCode}
      </CodeHighlighter>
    </div>
  );
};


export const Completed = () => {
  return (
    <div className='relative'>
      <CheckCircle className='mx-auto mb-8 h-40 w-40' />
      <h2>Модуль завершен!</h2>
      <p>
        Поздравляем! Вы успешно завершили третий модуль курса. Ваши списки
        теперь должны загружаться через наш мок-API, вы должны обработать
        состояния загрузки и ошибок, а также успешно предотвратить гонки
        состояний!
      </p>
      <p>
        В этом модуле мы научились работать с API, как получать данные с помощью{' '}
        <code>useEffect</code>, как обрабатывать состояния загрузки и ошибок, а
        также как использовать контроллеры прерывания для предотвращения гонок
        состояний. Мы также работали с refs и увидели, как мы можем использовать
        их в качестве альтернативы состоянию, когда нам не нужно отображать
        значение в пользовательском интерфейсе.
      </p>
      <p>
        Убедитесь, что вы правильно выполнили шаги, так как следующий модуль
        начнется с того места, на котором мы остановились.
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>4-routes-and-navigation</code> из выпадающего списка выше.
        Увидимся там!
      </p>
      <h3>Завершенные задачи</h3>
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

