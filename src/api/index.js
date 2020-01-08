import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export default {
    addArticle: (data) => request({
        url: '/admin/login',
        method: 'post',
        params: data
    }),
    uploadSnsImage: () => ('/upload/toLocal'),

}