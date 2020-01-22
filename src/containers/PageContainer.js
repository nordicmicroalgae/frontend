import React from 'react';
import Page from '../components/Page';


function readPage(page) {
  const pages = [
    'latest-images',
    'hall-of-fame',
    'how-to-contribute',
    'partners',
    'nomp',
    'helcom-peg',
    'links',
    'literature'
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pages.includes(page)) {
        return resolve({
          title: page,
          body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
        });
      }
      return reject();
    }, 1000);
  });
}

class PageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {page: undefined, isLoading: true};
  }

  componentDidMount() {
    this.getPage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.page != prevProps.match.params.page) {
      this.getPage();
    }
  }

  getPage() {
    const { params } = this.props.match;

    this.setState({isLoading: true});

    readPage(params.page)
      .then(page => {
        this.setState({ page, isLoading: false});
      })
      .catch(() => {
        this.setState({page: undefined, isLoading: false});
      })

  }

  render() {
    const { page, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (page == null) {
      return <h1>Page not found</h1>;
    }

    return <Page { ...page } />;
  }
}

export default PageContainer;
