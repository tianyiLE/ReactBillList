const { default: Layout } = require("@/pages/Layout");
const { default: Month } = require("@/pages/Month");
const { default: New } = require("@/pages/New");
const { default: Year } = require("@/pages/Year");
const { createBrowserRouter, Navigate } = require("react-router-dom");

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true, // 当访问 '/' 时，这条规则会匹配
                    element: <Navigate to="/month" replace={true} />,
                  },
                {
                    path: 'month',
                    element: <Month />
                },
                {
                    path: 'year',
                    element: <Year />
                }
            ]
        },
        {
            path: '/new',
            element: <New />
        }
    ]
)

export default router