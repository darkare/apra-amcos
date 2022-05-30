import TestRenderer, { act } from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { PHOTO_LIST_GQL } from '../../../shared/queries'
import PhotoListing from './PhotoList'
import { Row } from 'react-bootstrap'
const photosMock = {
    request: {
      query: PHOTO_LIST_GQL,
      variables: {
        options: {
          paginate: {
            limit: 10,
            page: 0,
          },
          search: { q: '' },
        },
      },
    },
    result: {
      data: {
        photos: {
          data: [
            {
              id: 1,
              title: 'Title text',
              url: 'http://abc.def.com',
              thumbnailUrl: 'http://aaa.bbb.com',
            },
          ],
          meta: {
            totalCount: 1,
          },
        },
      },
    },
  }

it ('renders loading with spinner' , ()=> {

    const component = TestRenderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
            <PhotoListing />
        </MockedProvider>
    )

    const tree:any = component.toJSON();

    expect(tree.children[0].props.className).toContain('spinner-border');
});

it('renders data and expect 2 rows: 1 header and 1 content', async () => {
  await act(async () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={[photosMock]} addTypename={false}>
        <PhotoListing />
      </MockedProvider>,
    )
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const rows =  await component.root.findAllByType(Row);
    expect(rows.length).toEqual(2);

  })
})
