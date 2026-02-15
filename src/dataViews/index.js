import { __ } from "@wordpress/i18n";
import domReady from "@wordpress/dom-ready";
import { createRoot } from "@wordpress/element";
import { DataViews } from "@wordpress/dataviews";
import { Card, CardHeader, CardBody, Icon, __experimentalHeading as Heading } from "@wordpress/components";
import { trash, image, category } from "@wordpress/icons";

import './styles.scss';

// Montage de l'application React dans le conteneur HTML généré en PHP
domReady(() => {
  const root = createRoot(document.getElementById("nice-2026-dataviews-page"));
  root.render(<DataViewsPage />);
});

// La page de vue de données
function DataViewsPage() {

  const actions = [
    {
      RenderModal: () => { },
      icon: <Icon icon={trash} />,
      id: 'delete',
      isPrimary: true,
      label: 'Delete item',
      modalFocusOnMount: 'firstContentElement',
      modalHeader: () => { },
      supportsBulk: true
    },
    {
      callback: () => { },
      id: 'secondary',
      label: 'Secondary action'
    }
  ];

  const config = {
    perPageSizes: [
      10,
      25,
      50,
      100
    ]
  };

  const data = [
    {
      author: 'lunarian_observer',
      categories: [
        'Solar system',
        'Satellite',
        'Earth',
        'Moon'
      ],
      date: '2021-01-01',
      datetime: '2021-01-01T14:30:00Z',
      email: 'moon@example.com',
      id: 1,
      image: 'https://live.staticflickr.com/7398/9458193857_e1256123e3_z.jpg',
      isPlanet: false,
      name: {
        description: 'The Moon is Earth\'s only natural satellite, orbiting at an average distance of 384,400 kilometers with a synchronous rotation that leads to fixed lunar phases as seen from Earth. Its cratered surface and subtle glow define night skies, inspiring exploration missions and influencing tides and biological rhythms worldwide.',
        title: 'Moon'
      },
      satellites: 0,
      type: 'Satellite'
    },
    {
      author: 'galilean_moon_enthusiast_supreme',
      categories: [
        'Solar system',
        'Satellite',
        'Jupiter',
        'Moon'
      ],
      date: '2019-01-02',
      datetime: '2019-01-02T09:15:00Z',
      email: 'io@example.com',
      id: 2,
      image: 'https://live.staticflickr.com/5482/9460973502_07e8ab81fe_z.jpg',
      isPlanet: false,
      name: {
        description: 'Moon of Jupiter',
        title: 'Io'
      },
      satellites: 0,
      type: 'Satellite'
    },
    {
      author: 'icy_ocean_explorer',
      categories: [
        'Solar system',
        'Satellite',
        'Jupiter',
        'Moon'
      ],
      date: '2025-01-03',
      datetime: '2025-01-03T16:45:30Z',
      email: 'europa@example.com',
      id: 3,
      image: 'https://live.staticflickr.com/65535/31499273012_baf5f38cc1_z.jpg',
      isPlanet: false,
      name: {
        description: 'Moon of Jupiter',
        title: 'Europa'
      },
      satellites: 0,
      type: 'Satellite'
    },
    {
      author: 'jovian_satellite_researcher',
      categories: [
        'Solar system',
        'Satellite',
        'Jupiter',
        'Moon'
      ],
      date: '2022-01-04',
      datetime: '2022-01-04T12:30:00Z',
      email: 'ganymede@example.com',
      id: 4,
      image: 'https://live.staticflickr.com/7816/33436473218_a836235935_k.jpg',
      isPlanet: false,
      name: {
        description: 'Largest moon of Jupiter',
        title: 'Ganymede'
      },
      satellites: 0,
      type: 'Satellite'
    },
    {
      author: 'crater_cartography_specialist',
      categories: [
        'Solar system',
        'Satellite',
        'Jupiter',
        'Moon'
      ],
      date: '2021-01-05',
      datetime: '2021-01-05T14:15:30Z',
      email: 'callisto@example.com',
      id: 5,
      image: 'https://live.staticflickr.com/804/27604150528_4512448a9c_c.jpg',
      isPlanet: false,
      name: {
        description: 'Outermost Galilean moon of Jupiter',
        title: 'Callisto'
      },
      satellites: 0,
      type: 'Satellite'
    },
    {
      author: 'astro_photographer',
      categories: [
        'Solar system',
        'Satellite',
        'Jupiter',
        'Moon'
      ],
      date: '2020-01-06',
      datetime: '2020-01-06T10:45:15Z',
      email: 'amalthea@example.com',
      id: 6,
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Amalthea.gif',
      isPlanet: false,
      name: {
        description: 'Small irregular moon of Jupiter',
        title: 'Amalthea'
      },
      satellites: 0,
      type: 'Satellite'
    },
    {
      author: 'irregular_orbit_analyst',
      categories: [
        'Solar system',
        'Satellite',
        'Jupiter',
        'Moon'
      ],
      date: '2019-01-07',
      datetime: '2019-01-07T16:20:45Z',
      email: 'himalia@example.com',
      id: 7,
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Cassini-Huygens_Image_of_Himalia.png',
      isPlanet: false,
      name: {
        description: 'Largest irregular moon of Jupiter',
        title: 'Himalia'
      },
      satellites: 0,
      type: 'Satellite'
    },
    {
      author: 'neptunian_dynamics_professor',
      categories: [
        'Ice giant',
        'Planet',
        'Solar system'
      ],
      date: '2020-01-01',
      datetime: '2020-01-01T11:22:15Z',
      email: 'neptune@example.com',
      id: 8,
      image: 'https://live.staticflickr.com/65535/29523683990_000ff4720c_z.jpg',
      isPlanet: true,
      name: {
        description: 'Ice giant in the Solar system',
        title: 'Neptune'
      },
      satellites: 16,
      type: 'Ice giant'
    },
    {
      author: 'retrograde_orbit_specialist',
      categories: [
        'Solar system',
        'Satellite',
        'Neptune',
        'Moon'
      ],
      date: '2021-02-01',
      datetime: '2021-02-01T11:30:00Z',
      email: 'triton@example.com',
      id: 9,
      image: 'https://live.staticflickr.com/65535/50728384241_02c5126c30_h.jpg',
      isPlanet: false,
      name: {
        description: 'Largest moon of Neptune',
        title: 'Triton'
      },
      satellites: 0,
      type: 'Satellite'
    },
    {
      author: 'outer_solar_system_voyager_mission_director',
      categories: [
        'Solar system',
        'Satellite',
        'Neptune',
        'Moon'
      ],
      date: '2020-02-02',
      datetime: '2020-02-02T15:45:30Z',
      email: 'nereid@example.com',
      id: 10,
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Nereid-Voyager2.jpg',
      isPlanet: false,
      name: {
        description: 'Irregular moon of Neptune',
        title: 'Nereid'
      },
      satellites: 0,
      type: 'Satellite'
    }
  ];

  const defaultLayouts = {
    table: {}
  };

  const fields = [
    {
      header: <Icon icon={image} />,
      id: 'image',
      label: 'Image',
      render: ({ item }) => (
        item.image ? <img src={item.image} alt={item.name.title} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : null
      ),
      type: 'media'
    },
    {
      enableGlobalSearch: true,
      enableHiding: true,
      filterBy: {
        operators: [
          'contains',
          'notContains',
          'startsWith'
        ]
      },
      getValue: ({ item }) => item.name.title,
      id: 'title',
      isValid: {
        required: true
      },
      label: 'Title',
      setValue: () => { },
      type: 'text'
    },
    {
      id: 'date',
      label: 'Date',
      type: 'date'
    },
    {
      id: 'datetime',
      label: 'Datetime',
      type: 'datetime'
    },
    {
      elements: [
        {
          label: 'Satellite',
          value: 'Satellite'
        },
        {
          label: 'Ice giant',
          value: 'Ice giant'
        },
        {
          label: 'Terrestrial',
          value: 'Terrestrial'
        },
        {
          label: 'Gas giant',
          value: 'Gas giant'
        },
        {
          label: 'Dwarf planet',
          value: 'Dwarf planet'
        },
        {
          label: 'Asteroid',
          value: 'Asteroid'
        },
        {
          label: 'Comet',
          value: 'Comet'
        },
        {
          label: 'Kuiper belt object',
          value: 'Kuiper belt object'
        },
        {
          label: 'Protoplanet',
          value: 'Protoplanet'
        },
        {
          label: 'Planetesimal',
          value: 'Planetesimal'
        },
        {
          label: 'Minor planet',
          value: 'Minor planet'
        },
        {
          label: 'Trans-Neptunian object',
          value: 'Trans-Neptunian object'
        },
        {
          label: 'Extreme Trans-Neptunian Scattered Disc Object',
          value: 'Extreme Trans-Neptunian Scattered Disc Object'
        }
      ],
      enableHiding: false,
      filterBy: {
        operators: [
          'is',
          'isNot'
        ]
      },
      id: 'type',
      label: 'Type'
    },
    {
      elements: [
        {
          label: 'True',
          value: true
        },
        {
          label: 'False',
          value: false
        }
      ],
      id: 'isPlanet',
      label: 'Is Planet',
      setValue: () => { },
      type: 'boolean'
    },
    {
      enableSorting: true,
      id: 'satellites',
      label: 'Satellites',
      type: 'integer'
    },
    {
      enableGlobalSearch: true,
      enableSorting: false,
      filterBy: {
        operators: [
          'contains',
          'notContains',
          'startsWith'
        ]
      },
      getValue: ({ item }) => item.name.description,
      id: 'description',
      label: 'Description',
      setValue: () => { },
      type: 'text'
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email'
    },
    {
      elements: [
        {
          label: 'Solar system',
          value: 'Solar system'
        },
        {
          label: 'Satellite',
          value: 'Satellite'
        },
        {
          label: 'Moon',
          value: 'Moon'
        },
        {
          label: 'Earth',
          value: 'Earth'
        },
        {
          label: 'Jupiter',
          value: 'Jupiter'
        },
        {
          label: 'Planet',
          value: 'Planet'
        },
        {
          label: 'Ice giant',
          value: 'Ice giant'
        },
        {
          label: 'Terrestrial',
          value: 'Terrestrial'
        },
        {
          label: 'Gas giant',
          value: 'Gas giant'
        },
        {
          label: 'Extreme Outer Solar System Trans-Neptunian Region',
          value: 'Extreme Outer Solar System Trans-Neptunian Region'
        }
      ],
      enableGlobalSearch: true,
      header: <Icon icon={category} />,
      id: 'categories',
      label: 'Categories',
      type: 'array'
    },
    {
      elements: [
        {
          label: 'lunarian_observer',
          value: 'lunarian_observer'
        },
        {
          label: 'galilean_moon_enthusiast_supreme',
          value: 'galilean_moon_enthusiast_supreme'
        },
        {
          label: 'icy_ocean_explorer',
          value: 'icy_ocean_explorer'
        },
        {
          label: 'jovian_satellite_researcher',
          value: 'jovian_satellite_researcher'
        },
        {
          label: 'crater_cartography_specialist',
          value: 'crater_cartography_specialist'
        },
        {
          label: 'astro_photographer',
          value: 'astro_photographer'
        },
        {
          label: 'irregular_orbit_analyst',
          value: 'irregular_orbit_analyst'
        },
        {
          label: 'neptunian_dynamics_professor',
          value: 'neptunian_dynamics_professor'
        },
        {
          label: 'retrograde_orbit_specialist',
          value: 'retrograde_orbit_specialist'
        },
        {
          label: 'outer_solar_system_voyager_mission_director',
          value: 'outer_solar_system_voyager_mission_director'
        },
        {
          label: 'space_observer',
          value: 'space_observer'
        },
        {
          label: 'solar_wind_scientist',
          value: 'solar_wind_scientist'
        },
        {
          label: 'atmospheric_chemistry_expert',
          value: 'atmospheric_chemistry_expert'
        },
        {
          label: 'planetary_geologist',
          value: 'planetary_geologist'
        },
        {
          label: 'red_planet_explorer',
          value: 'red_planet_explorer'
        },
        {
          label: 'gas_giant_meteorologist',
          value: 'gas_giant_meteorologist'
        },
        {
          label: 'ring_system_analyst',
          value: 'ring_system_analyst'
        },
        {
          label: 'axial_tilt_researcher',
          value: 'axial_tilt_researcher'
        },
        {
          label: 'interstellar_nomadic_planetary_body_tracking_specialist',
          value: 'interstellar_nomadic_planetary_body_tracking_specialist'
        }
      ],
      enableGlobalSearch: true,
      enableHiding: false,
      filterBy: {
        operators: [
          'isAny',
          'isNone'
        ]
      },
      id: 'author',
      label: 'Author',
      type: 'text'
    }
  ];

  const paginationInfo = {
    totalItems: 19,
    totalPages: 2
  };

  const view = {
    descriptionField: 'description',
    fields: [
      'categories'
    ],
    filters: [],
    groupBy: undefined,
    layout: {
      styles: {
        satellites: {
          align: 'end'
        }
      }
    },
    mediaField: 'image',
    page: 1,
    perPage: 10,
    search: '',
    showMedia: true,
    titleField: 'title',
    type: 'table'
  };

  return (
    <Card>
      <CardHeader>
        <Heading level={1}>
          {__('DataViews', 'nice-2026')}
        </Heading>
      </CardHeader>
      <CardBody>
        <DataViews
          actions={actions}
          config={config}
          data={data}
          defaultLayouts={defaultLayouts}
          fields={fields}
          getItemId={(item) => item.id}
          isItemClickable={() => { }}
          onChangeView={() => { }}
          paginationInfo={paginationInfo}
          renderItemLink={() => { }}
          view={view}
        />
      </CardBody>
    </Card>
  );
}