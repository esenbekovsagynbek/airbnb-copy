import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

import { Separator } from '@/components/ui';

import CodeHighlighter from './CodeHighlighter';
import TaskList from './TaskList';

const tasks = [
  'Преобразовать статические <code>listings</code> в <code>HomePage</code> в состояние',
  'Создать компонент <code>ListingFilters</code>',
  'Добавить состояние и обработчики событий в <code>ListingFilters</code>',
  'Добавить пропс обратного вызова в <code>ListingFilters</code>',
  'Добавить <code>ListingFilters</code> в <code>HomePage</code>',
  'Создать обратный вызов для обновления фильтров в <code>HomePage</code>',
];


export const Intro = () => {
  return (
    <div>
      <h2>Модуль 2 - Состояние и Обработчики Событий</h2>
      <Separator className='mb-2' />
      <p>
        В этом модуле мы будем работать с состоянием и добавлять некоторые
        переменные состояния в наше приложение. Мы также будем работать с
        обработчиками событий, чтобы позволить нашим пользователям взаимодействовать
        с нашим приложением.
      </p>
      <h3>Описание</h3>
      <Separator className='mb-2' />
      <p>
        Цель этого модуля — научиться работать с состоянием и оживить наше
        приложение, сделав его с состоянием. Состояние позволяет вещам изменяться
        со временем и является очень важной частью любого приложения. А чтобы
        изменить состояние, нам нужно будет научиться работать с обработчиками
        событий.
      </p>
      <p>
        Мы начнем с преобразования наших <code>listings</code> в состояние, что
        позволит <code>listings</code> изменяться со временем. Затем мы создадим
        функцию, которая сможет фильтровать <code>listings</code> и заменять их
        на те, которые соответствуют критериям фильтрации. В конце концов, мы
        добавим некоторые элементы ввода, чтобы пользователь мог изменить
        состояние <code>listings</code>.
      </p>
      <p>
        Нам нужно будет создать новый компонент под названием <code>ListingFilters</code>{' '}
        который будет обрабатывать фильтры и отображать некоторые компоненты,
        позволяющие пользователям фильтровать объявления, ища их название,
        выбирая диапазон дат и добавляя количество гостей. Затем мы добавим этот
        компонент на <code>HomePage</code> и используем его для фильтрации
        объявлений в компоненте <code>HomePage</code>.
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


const homePageCode = `import { useState } from 'react';

import { listings as staticListings } from '@/api/data/listings';
import ListingList from '@/components/ListingList';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  return (
    <div className='container py-4'>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step1 = () => {
  return (
    <div>
      <h2>
        Преобразование статических <code>listings</code> в <code>HomePage</code> в состояние
      </h2>
      <p>
        Первое, что нам нужно сделать, это сделать наши <code>listings</code> состоянием. В настоящее время мы импортируем <code>listings</code> напрямую из файла <code>src/api/data/listings</code>, что означает, что <code>listings</code> статичны и никогда не изменятся.
      </p>
      <p>
        Для этого мы воспользуемся одним из самых распространенных хуков в React: <code>useState</code>. Этот хук позволит нам хранить переменную состояния, а также предоставит нам функцию обновления для ее изменения. Мы можем вызвать эту функцию, когда захотим обновить наше состояние.
      </p>
      <p>
        Нам нужно будет использовать псевдоним при импорте наших listings, поскольку теперь у нас будет новая переменная состояния с именем <code>listings</code>, и мы не можем иметь дубликатов. Чтобы упростить задачу, мы назовем псевдоним <code>staticListings</code>. Затем мы можем использовать хук <code>useState</code>, чтобы создать переменную состояния с именем <code>listings</code> и передать ей эти статические listings.
      </p>
      <p>
        С этими изменениями наше приложение будет работать так же, и не будет никаких явных различий. Однако теперь мы позволили нашим <code>listings</code> динамически изменяться со временем, что позволит нам добавить некоторую функциональность для изменения отображаемых listings позже.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[1, 3, 7]}
        title='src/pages/HomePage.jsx'
      >
        {homePageCode}
      </CodeHighlighter>
    </div>
  );
};


const listingFiltersCode = `import { Search } from 'lucide-react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = () => {
  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input className='w-[400px]' placeholder='Search destinations' />
      <DateRangePicker placeholder='Add dates' />
      <Stepper />
      <Button>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;`;

export const Step2 = () => {
  return (
    <div>
      <h2>
        Создание компонента <code>ListingFilters</code>
      </h2>
      <p>
        Теперь, когда наши <code>listings</code> находятся в состоянии в <code>HomePage</code>, мы можем начать создавать компоненты, которые будут их изменять. Нам нужно будет добавить строку поиска, чтобы наши пользователи могли искать объявления по заголовку, выбор дат, чтобы пользователи могли выбрать свои даты, ввод с шагами, чтобы пользователи могли выбрать количество гостей, и, наконец, нам понадобится кнопка отправки, чтобы установить фильтры и обновить объявления.
      </p>
      <p>
        Лучший способ сделать это — создать новый компонент, который мы назовем <code>ListingFilters</code>. Создание нового компонента для этого — хорошая идея, потому что мы можем инкапсулировать всю логику и интерфейс для фильтров в одном месте, а затем просто использовать этот компонент в <code>HomePage</code>.
      </p>
      <p>
        Здесь мы также будем использовать несколько полезных компонентов из папки <code>src/components/ui</code>. У нас есть компонент <code>Input</code>, компонент <code>DateRangePicker</code>, компонент <code>Stepper</code> и компонент <code>Button</code>. Мы также используем иконку <code>Search</code> из <code>lucide-react</code>.
      </p>
      <p>
        Нам нужно будет создать новый файл в директории <code>src/components</code> под названием <code>ListingFilters.jsx</code> со следующим кодом:
      </p>
      <CodeHighlighter title='src/components/ListingFilters.jsx'>
        {listingFiltersCode}
      </CodeHighlighter>
    </div>
  );
};


const listingFiltersWithState = `import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = () => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder='Add dates'
      />
      <Stepper label='guest' value={guests} onChange={setGuests} />
      <Button>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;`;

export const Step3 = () => {
  return (
    <div>
      <h2>
        Добавление состояния и обработчиков событий в <code>ListingFilters</code>
      </h2>
      <p>
        Наш компонент <code>ListingFilters</code> в данный момент ничего не делает, кроме как отображает интерфейс. Нам нужно изменить это и добавить в него состояние и обработчики событий, чтобы мы могли использовать его для фильтрации наших объявлений.
      </p>
      <p>
        Нам нужно будет создать 3 переменные состояния: <code>dates</code>, <code>guests</code> и <code>search</code>. Мы передадим <code>dates</code> в <code>DateRangePicker</code>, <code>guests</code> в <code>Stepper</code>, а <code>search</code> в компонент <code>Input</code>. Мы также передадим функции обновления этим компонентам, чтобы они могли обновлять переменные состояния.
      </p>
      <p>
        Для <code>Input</code> нам нужно будет получить свойство <code>e.target.value</code> и установить его в состояние, для <code>Stepper</code> мы передадим функцию <code>setGuests</code> напрямую, а для <code>DateRangePicker</code> мы просто передадим <code>setDates</code>, так как он уже настроен на возврат правильных данных. Даты будут объектом с свойствами <code>from</code> и <code>to</code>.
      </p>
      <p>
        Кроме того, нам нужно добавить свойство <code>minDate</code> к <code>DateRangePicker</code> со значением текущей даты, чтобы не позволить пользователям выбирать даты в прошлом! Мы не будем ограничивать даты в будущем, так что пользователи могут бронировать на любое будущее время.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingFilters</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[2, 7, 8, 9, 16, 17, 20, 21, 22, 25]}
        title='src/components/ListingFilters.jsx'
      >
        {listingFiltersWithState}
      </CodeHighlighter>
    </div>
  );
};


const listingFiltersWithCallbacks = `import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = ({ onChange }) => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder='Add dates'
      />
      <Stepper label='guest' value={guests} onChange={setGuests} />
      <Button onClick={handleSubmit}>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ListingFilters;`;

export const Step4 = () => {
  return (
    <div>
      <h2>
        Добавление колбэка в качестве пропса к <code>ListingFilters</code>
      </h2>
      <p>
        Наш компонент <code>ListingFilters</code> выглядит хорошо, но его состояние
        является самодостаточным. В данный момент у нас нет способа передать это состояние
        в компонент <code>HomePage</code>, где оно нам нужно.
      </p>
      <p>
        Важно понять, что <code>HomePage</code> отвечает за фильтрацию <code>listings</code>,
        а не компонент <code>ListingFilters</code>. Это ответственность <code>HomePage</code>,
        поскольку именно он хранит состояние для <code>listings</code>. <code>ListingFilters</code>
        просто будет управлять своим внутренним состоянием, за которое отвечает сам, и
        только вызывать колбэк из <code>HomePage</code> с фильтрами.
      </p>
      <p>
        Чтобы передать состояние вверх, нам нужно будет два вещи. Сначала нам нужна{' '}
        <code>onChange</code> колбэк-функция, которую <code>HomePage</code> передаст <code>ListingFilters</code>,
        а затем нам нужна функция <code>handleSubmit</code>, которую <code>ListingFilters</code>
        вызовет, когда будет нажата <code>Button</code>. Функция <code>handleSubmit</code>
        затем вызовет колбэк <code>onChange</code>.
      </p>
      <p>
        Функция <code>handleSubmit</code> будет вызывать колбэк <code>onChange</code> с текущими значениями{' '}
        <code>dates</code>, <code>guests</code> и <code>search</code>. Мы прикрепим её к <code>Button</code>,
        чтобы каждый раз, когда она нажимается, мы передавали состояние вверх для использования в <code>HomePage</code>.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>ListingFilters</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[6, 11, 12, 13, 30]}
        title='src/components/ListingFilters.jsx'
      >
        {listingFiltersWithCallbacks}
      </CodeHighlighter>
    </div>
  );
};


export const homePageWithListingFiltersCode = `import { useState } from 'react';

import { listings as staticListings } from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;`;

export const Step5 = () => {
  return (
    <div>
      <h2>
        Добавление <code>ListingFilters</code> в <code>HomePage</code>
      </h2>
      <p>
        Теперь, когда наш компонент <code>ListingFilters</code> полностью функционален,
        мы можем интегрировать его в <code>HomePage</code>. Нам нужно будет импортировать{' '}
        <code>ListingFilters</code> в <code>HomePage</code> и отобразить его.
      </p>
      <p>
        Пока не будем беспокоиться о передаче колбэка <code>onChange</code>, так как
        мы создадим его на следующем шаге. Но нам нужно будет позаботиться о расположении
        и стилях <code>ListingFilters</code>, чтобы он хорошо смотрелся в <code>HomePage</code>.
      </p>
      <p>
        Мы разместим <code>ListingFilters</code> вверху страницы и используем <code>Separator</code>{' '}
        из нашей папки <code>src/components/ui</code>, чтобы создать визуальное отделение
        между ним и остальной частью страницы. Это сделает наши фильтры видимыми
        в верхней части экрана, где пользователи их ожидают.
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[4, 6, 13, 14, 15, 16]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithListingFiltersCode}
      </CodeHighlighter>
    </div>
  );
};


export const homePageWithFiltersCallbackCode = `import { useState } from 'react';

import {
  isListingAvailable,
  listings as staticListings,
} from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  const handleFilters = (filters) => {
    const { dates, guests, search } = filters;

    // Resets filters by using static listings
    let filteredListings = staticListings;

    // Handles date range
    if (dates) {
      filteredListings = filteredListings.filter((listing) =>
        isListingAvailable(listing, dates),
      );
    }

    // Handles guests
    if (guests) {
      filteredListings = filteredListings.filter(
        (listing) => guests <= listing.maxGuests,
      );
    }

    // Handles search
    if (search) {
      filteredListings = filteredListings.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setListings(filteredListings);
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

export const Step6 = () => {
  return (
    <div>
      <h2>
        Создание колбэка для обновления фильтров в <code>HomePage</code>
      </h2>
      <p>
        Наконец, нам нужно создать и передать колбэк-функцию в{' '}
        <code>ListingFilters</code> как его пропс <code>onChange</code>. Как мы уже
        видели, этот колбэк будет вызываться каждый раз, когда фильтры
        отправляются, и ему будут переданы текущие значения <code>dates</code>,{' '}
        <code>guests</code> и <code>search</code>.
      </p>
      <p>
        Чтобы создать нашу колбэк-функцию, которую мы назовем{' '}
        <code>handleFilters</code>, нам нужно будет передать фильтры из{' '}
        <code>ListingFilters</code> и использовать их для обновления состояния{' '}
        <code>listings</code>, чтобы показывать только те списки, которые
        соответствуют фильтрам. Нам нужно будет обработать значение{' '}
        <code>dates</code> фильтров, значение <code>guests</code>, а также
        значение <code>search</code>.
      </p>
      <p>
        Сначала нам нужно проверить, что название списка содержит{' '}
        <code>search</code>, затем проверить, что <code>guests</code> меньше
        свойства <code>maxGuests</code> списка, а для дат мы воспользуемся
        полезной вспомогательной функцией <code>isListingAvailable</code>, чтобы
        проверить, доступны ли даты в списке. Эта функция позволяет нам передать{' '}
        <code>listing</code> и некоторые <code>dates</code>, и она скажет нам,
        доступен ли <code>listing</code> или нет.
      </p>
      <p>
        Исходя из этих результатов, мы затем отфильтруем <code>listings</code> и
        покажем только те, которые соответствуют критериям фильтрации, обновив
        состояние с помощью нашей функции обновления <code>setListings</code>. Это
        автоматически обновит наш интерфейс только с теми <code>listings</code>,
        которые соответствуют нашим критериям!
      </p>
      <p>
        Нам нужно будет обновить компонент <code>HomePage</code> следующим кодом:
      </p>
      <CodeHighlighter
        highlightedLines={[
          4, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
        ]}
        title='src/pages/HomePage.jsx'
      >
        {homePageWithFiltersCallbackCode}
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
        Поздравляем! Вы завершили второй модуль курса. Фильтры на главной
        странице теперь полностью работают. Попробуйте выбрать диапазон дат,
        искать список по его заголовку или выбрать количество гостей, а затем
        нажмите кнопку для отправки ваших фильтров. Это отфильтрует ваши
        списки и покажет только те, которые соответствуют выбранным вами
        критериям!
      </p>
      <p>
        В этом модуле мы научились работать с состоянием в React. Мы добавили
        состояние к спискам на главной странице и создали новый компонент для
        обработки фильтров. Мы также узнали, как передавать колбэки между
        компонентами и как использовать их для обновления состояния в родительском
        компоненте. Мы работали с обработчиками событий и научились использовать
        их для получения значения в ответ на ввод пользователя.
      </p>
      <p>
        Убедитесь, что вы правильно выполнили шаги, так как следующий модуль
        начнется с того места, на котором мы остановились.
      </p>
      <p>
        Чтобы перейти к следующему модулю, просто выберите{' '}
        <code>3-effects-and-data-fetching</code> из выпадающего списка выше.
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

