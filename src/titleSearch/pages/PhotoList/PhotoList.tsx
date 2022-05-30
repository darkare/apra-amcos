import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  Image,
  Spinner,
  Pagination,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import PhotoModal from '../../component/modal/PhotoModal'
import { PHOTO_LIST_GQL } from '../../../shared/queries'
import { ROW_PER_PAGE } from '../../../shared/config'
import SearchInput from '../../component/searchInput/SearchInput'
import './PhotoList.css'
import ColouredLine from '../../component/utility/ColoredLine'
import {
  PaginateOptions,
  SearchOptions,
} from '../../../shared/gql-types'


interface Photo {
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

interface PhotoData {
  photos: {
    data: Photo[]
    meta: {
      totalCount: number
    }
  }
}

interface PhotoDataQueryOptions {
  options: { paginate: PaginateOptions; search: SearchOptions }
}

const PhotoListing = () => {
  const [popupPhoto, setPopupPhoto] = useState({
    displayModel: false,
    photoUrl: '',
  })

  const [selectedPage, setSelectedPage] = useState(0)
  const [totalItem, setTotalItem] = useState(0)
  const [photos, setPhotos] = useState<Array<any>>()
  const [searchText, setSearchText] = useState('')
  const [paginationItems, setPagenationItems] = useState<Array<JSX.Element>>([])

  const displayImage = (imageUrl: string) => {
    setPopupPhoto({ displayModel: true, photoUrl: imageUrl })
  }

  const setCurrentPage = (pageNum: number) => {
    if (selectedPage !== pageNum) {
      setSelectedPage(pageNum)
    }
  }

  const closeImageModal = () => {
    setPopupPhoto({ displayModel: false, photoUrl: '' })
  }

  const { loading, error, data } = useQuery<PhotoData, PhotoDataQueryOptions>(
    PHOTO_LIST_GQL,
    {
      variables: {
        options: {
          paginate: {
            limit: ROW_PER_PAGE,
            page: selectedPage,
          },
          search: { q: searchText },
        },
      },
    },
  )

  // to set the photos and initialise selected page when there is change in the data set
  useEffect(() => {
    if (data) {
      // console.log(data.photos.meta.totalCount, data.photos.data[0]);
      setPhotos(data.photos.data);
      setTotalItem(data.photos.meta.totalCount);
      if (selectedPage === 0) {
        setSelectedPage(1)
      }
    }
  }, [data, selectedPage, totalItem])

  const initPagination = (selectedIndex: number, totalItem: number) => {
    let active = selectedIndex;
    let maxPage = Math.floor(totalItem / ROW_PER_PAGE) + 1;
    let items = [];

    for (let number = 1; number <= maxPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>,
      )
    }
    setPagenationItems(items)
  }

  /** this useEffect is for rebulding the pagination.
   * includ the initPagination in the watch will cause infinite loop */ 
  useEffect(() => {
    initPagination(selectedPage, totalItem)
  // eslint-disable-next-line
  }, [selectedPage, totalItem])

  if (loading)
    return (
     <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </div>
    )

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  if (data!.photos.meta.totalCount === 0) {
    return (
      <div>
        <SearchInput
          initialValue={searchText}
          getSearchString={setSearchText}
        />

        <div className="no-results">
          <b>No search results found. </b>
        </div>
      </div>
    )
  }

  return (
    <>
      <SearchInput initialValue={searchText} getSearchString={setSearchText} />
      {popupPhoto.displayModel && (
        <PhotoModal
          displayModel={popupPhoto.displayModel}
          imageUrl={popupPhoto.photoUrl}
          closeModal={closeImageModal}
        />
      )}
      <Container id='results' fluid="md">
        <Row>
          <Col xs={1}>
            <b>Id</b>
          </Col>
          <Col xs={9}>
            <b>Title</b>
          </Col>
          <Col xs={2}>
            <b>Thumbnail</b>
          </Col>
        </Row>
        <ColouredLine colour="black" />
        {photos &&
          photos.map((r: Photo) => {
            return (
              <Row myid={`${r.id}`} key={r.id}>
                <Col xs={1}>{r.id}</Col>
                <Col xs={9}>{r.title}</Col>
                <Col xs={2}>
                  <Image
                    className="image-padding"
                    src={r.thumbnailUrl}
                    onClick={() => {
                      displayImage(r.url)
                    }}
                  ></Image>
                </Col>
              </Row>
            )
          })}
      </Container>
      <div className="row-spacer"></div>
      <Pagination>{paginationItems}</Pagination>
    </>
  )
}

export default PhotoListing
