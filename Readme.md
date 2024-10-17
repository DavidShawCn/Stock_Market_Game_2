# Stock Market Simulation 2.1

Category: Game
Status: Primary

Welcome to the **Stock Market Simulator**! This application simulates a stock market environment with automated traders (autoplayers). Users can configure various parameters, observe stock price movements, and monitor the performance of autoplayers in real-time.欢迎来到**股市模拟器**！该应用程序模拟具有自动交易者（自动播放器）的股票市场环境。用户可以配置各种参数，观察股价走势，实时监控自动播放器的表现。

---

## Table of Contents目录

1. [Introduction介绍](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
2. [Features特征](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
3. [Technology Stack技术栈](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
4. [Project Structure项目结构](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
5. [Setup and Installation设置和安装](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
6. [Usage用法](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
7. [Code Overview代码概述](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
    - [Backend后端](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
    - [Frontend前端](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
8. [API EndpointsAPI端点](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
9. [Error Handling错误处理](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
10. [Future Enhancements未来的增强功能](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
11. [Contributing贡献](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)
12. [License执照](https://www.notion.so/Stock-Market-Simulation-2-1-12049a54800980d28e27cd7b4b5485f6?pvs=21)

---

## Introduction介绍

The **Stock Market Simulator** is a full-stack application that provides a simulated stock market environment. Users can:**股票市场模拟器**是一个全栈应用程序，提供模拟股票市场环境。用户可以：

- Configure simulation parameters such as stock quantities, autoplayer counts, price ranges, initial cash amounts, and simulation speed.
    
    配置模拟参数，例如库存数量、自动播放器数量、价格范围、初始现金金额和模拟速度。
    
- Start and stop the simulation at any time.
    
    随时开始和停止模拟。
    
- View real-time updates of stock prices, including historical price charts.
    
    查看股票价格的实时更新，包括历史价格图表。
    
- Monitor the portfolios and activities of automated traders (autoplayers).
    
    监控自动交易者（自动玩家）的投资组合和活动。
    

---

## Features特征

- **User-Configurable Parameters**: Set ranges for stock shares, autoplayer counts, issue prices, initial cash amounts, and simulation speed.
    
    **用户可配置参数**：设置股票份额、自动玩家数量、发行价格、初始现金金额和模拟速度的范围。
    
- **Randomized Simulation**: Parameters are generated randomly within specified ranges at the start of the simulation.
    
    **随机模拟**：参数在模拟开始时在指定范围内随机生成。
    
- **Real-Time Data**: View live updates of stock prices, autoplayer portfolios, and market trends.
    
    **实时数据**：查看实时更新的股票价格、自动播放器投资组合和市场趋势。
    
- **Historical Price Charts**: Visualize stock price history using interactive line charts.
    
    **历史价格图表**：使用交互式折线图可视化股票价格历史记录。
    
- **Start/Stop Simulation**: Control the simulation's execution through intuitive UI controls.
    
    **开始/停止模拟**：通过直观的 UI 控件控制模拟的执行。
    
- **Adjustable Speed**: Modify the simulation speed by setting the time interval between actions.
    
    **可调速度**：通过设置动作之间的时间间隔来修改模拟速度。
    
- **Error Handling**: Comprehensive error handling on both frontend and backend ensures smooth operation and user feedback.
    
    **错误处理**：前端和后端的全面错误处理确保平稳运行和用户反馈。
    

---

## Technology Stack技术栈

- **Backend**: Node.js, Express.js
    
    **后端**：Node.js、Express.js
    
- **Frontend**: React.js, React Router v6, Recharts, Bootstrap
    
    **前端**：React.js、React Router v6、Recharts、Bootstrap
    
- **Communication**: RESTful API using Fetch API
    
    **通信**：使用 Fetch API 的 RESTful API
    
- **Languages**: JavaScript (ES6+)
    
    **语言**：JavaScript (ES6+)
    

---

## Project Structure项目结构

### Backend (`stock-simulator/`)后端（ `stock-simulator/` ）

```css
css
Copy code
stock-simulator/
├── app.js
├── models/
│   ├── Autoplayer.js
│   ├── Strategy.js
│   ├── Stock.js
│   ├── Trader.js
│   ├── Brokerage.js
│   ├── Market.js
│   ├── Order.js
│   ├── BuyOrder.js
│   └── SellOrder.js
├── routes/
│   └── api.js
├── controllers/
│   └── simulationController.js
└── package.json

```

### Frontend (`stock-simulator-client/`)前端（ `stock-simulator-client/` ）

```java
java爪哇
Copy code
stock-simulator-client/
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── Navbar.js
│   │   ├── SimulationControl.js
│   │   ├── Stocks.js
│   │   ├── StocksList.js
│   │   ├── StockPriceChart.js
│   │   ├── Autoplayers.js
│   │   ├── AutoplayerList.js
│   │   └── OverviewData.js
│   ├── index.js
│   └── App.css
├── public/
│   ├── index.html
│   └── ...
├── package.json
└── ...

```

---

## Setup and Installation设置和安装

### Prerequisites先决条件

- Node.js (v12.x or higher)
    
    Node.js（v12.x 或更高版本）
    
- npm (v6.x or higher)
    
    npm（v6.x 或更高版本）
    

### Backend Setup后端设置

1. **Clone the repository** (or download the source code):**克隆存储库**（或下载源代码）：
    
    ```bash
    git clone https://github.com/yourusername/stock-market-simulator.git
    ```
    
2. **Navigate to the backend directory**:**导航到后端目录**：
    
    ```bash
    cd stock-market-simulator/stock-simulator
    ```
    
3. **Install dependencies**:**安装依赖项**：
    
    ```bash
    npm install
    ```
    
4. **Start the backend server**:**启动后端服务器**：
    
    ```bash
    node app.js
    ```
    
    The backend server should now be running on `http://localhost:3001`.后端服务器现在应该在`http://localhost:3001`上运行。
    

### Frontend Setup前端设置

1. **Navigate to the frontend directory**:**导航到前端目录**：
    
    ```bash
    cd ../stock-simulator-client
    ```
    
2. **Install dependencies**:**安装依赖项**：
    
    ```bash
    npm install
    ```
    
3. **Start the frontend application**:**启动前端应用程序**：
    
    ```bash
    npm start
    ```
    
    The frontend application should now be running on `http://localhost:3000`.前端应用程序现在应该在`http://localhost:3000`上运行。
    

---

## Usage用法

1. **Access the Application**: Open your web browser and navigate to `http://localhost:3000`.**访问应用程序**：打开 Web 浏览器并导航至`http://localhost:3000` 。
2. **Set Simulation Parameters**:**设置模拟参数**：
    - Adjust the parameters in the **Simulation Control** form according to your preferences.
        
        根据您的喜好调整**模拟控制**表单中的参数。
        
    - Parameters include ranges for stock shares, autoplayer counts, issue prices, initial cash amounts, and the simulation speed.
        
        参数包括股票份额范围、自动玩家数量、发行价格、初始现金金额和模拟速度。
        
3. **Start the Simulation**:**开始模拟**：
    - Click the **"Start Simulation"** button.
        
        单击**“开始模拟”**按钮。
        
    - The simulation will begin, and data will start updating in real-time.
        
        模拟将开始，数据将开始实时更新。
        
4. **Navigate Between Pages**:**在页面之间导航**：
    - Use the navigation bar at the top to switch between the **Stocks** and **Autoplayers** pages.
        
        使用顶部的导航栏在“**股票”**和**“自动玩家”**页面之间切换。
        
5. **Monitor the Simulation**:**监控模拟**：
    - **Stocks Page**: View stock price history charts and current prices.
        
        **股票页面**：查看股票价格历史图表和当前价格。
        
    - **Autoplayers Page**: Monitor the portfolios and cash positions of autoplayers.
        
        **自动玩家页面**：监控自动玩家的投资组合和现金头寸。
        
6. **Stop the Simulation**:**停止模拟**：
    - Click the **"Stop Simulation"** button to halt the simulation.
        
        单击**“停止模拟”**按钮可停止模拟。
        
7. **Adjust Parameters and Restart**:**调整参数并重启**：
    - You can adjust the parameters and start the simulation again to observe different scenarios.
        
        您可以调整参数并再次启动模拟来观察不同的场景。
        

---

## Code Overview代码概述

### Backend后端

### `app.js`

The entry point of the backend application:后端应用程序的入口点：

- Sets up the Express server.
    
    设置 Express 服务器。
    
- Configures middleware, including CORS and JSON parsing.
    
    配置中间件，包括CORS和JSON解析。
    
- Defines the API routes.
    
    定义 API 路由。
    

### `models/`

Contains all the class definitions:包含所有类定义：

- **Autoplayer.js**: Represents an automated trader.
    
    **Autoplayer.js** ：代表自动交易者。
    
- **Strategy.js**: Encapsulates trading strategies.
    
    **Strategy.js** ：封装交易策略。
    
- **Stock.js**: Represents a stock in the market.
    
    **Stock.js** ：代表市场上的一只股票。
    
- **Trader.js**: Handles the order matching for a particular stock.
    
    **Trader.js** ：处理特定股票的订单匹配。
    
- **Brokerage.js**: Manages the initial shares and trades at varying prices.
    
    **Brokerage.js** ：管理初始股票并以不同的价格进行交易。
    
- **Market.js**: Manages the overall market, including multiple stocks and traders.
    
    **Market.js** ：管理整个市场，包括多个股票和交易者。
    
- **Order.js**, **BuyOrder.js**, **SellOrder.js**: Define the order structures.
    
    **Order.js** 、 **BuyOrder.js** 、 **SellOrder.js** ：定义订单结构。
    

### `controllers/simulationController.js`

Handles API requests related to the simulation:处理与模拟相关的 API 请求：

- **startSimulation**: Initializes and starts the simulation based on user parameters.
    
    **startSimulation** ：根据用户参数初始化并启动模拟。
    
- **stopSimulation**: Stops the ongoing simulation.
    
    **stopSimulation** ：停止正在进行的模拟。
    
- **getSimulationData**: Provides real-time data to the frontend.
    
    **getSimulationData** ：向前端提供实时数据。
    
- **updateParameters**: Allows updating of simulation parameters (if implemented).
    
    **updateParameters** ：允许更新模拟参数（如果实现）。
    

### `routes/api.js`

Defines the API endpoints and maps them to controller functions.定义 API 端点并将它们映射到控制器功能。

---

### Frontend前端

### `src/components/`

Contains all React components:包含所有 React 组件：

- **App.js**: The main component that manages state, routing, and renders child components.
    
    **App.js** ：管理状态、路由和渲染子组件的主要组件。
    
- **Navbar.js**: Provides navigation links to different pages.
    
    **Navbar.js** ：提供不同页面的导航链接。
    
- **SimulationControl.js**: Provides the UI for users to start/stop the simulation and set parameters.
    
    **SimulationControl.js** ：为用户提供启动/停止模拟和设置参数的 UI。
    
- **Stocks.js**: A page component that displays stocks and their price charts.
    
    **Stocks.js** ：显示股票及其价格图表的页面组件。
    
- **StocksList.js**: Displays a list of stocks with their current prices and charts.
    
    **StocksList.js** ：显示股票列表及其当前价格和图表。
    
- **StockPriceChart.js**: Visualizes the stock price history using a line chart.
    
    **StockPriceChart.js** ：使用折线图可视化股票价格历史记录。
    
- **Autoplayers.js**: A page component that displays autoplayers and their portfolios.
    
    **Autoplayers.js** ：显示自动播放器及其组合的页面组件。
    
- **AutoplayerList.js**: Shows the list of autoplayers and their portfolios.
    
    **AutoplayerList.js** ：显示自动播放器及其组合的列表。
    
- **OverviewData.js**: (Placeholder) Can be used to display aggregated market data.
    
    **OverviewData.js** ：（占位符）可用于显示汇总的市场数据。
    

### `src/index.js`

Renders the main `App` component into the DOM and includes Bootstrap CSS.将主`App`组件渲染到 DOM 中并包含 Bootstrap CSS。

---

## API EndpointsAPI端点

### **POST** `/api/start`**POST** `/api/start`

Starts the simulation with user-defined parameters.使用用户定义的参数开始模拟。

- **Request Body**:**请求正文**：
    
    ```json
    {
      "amountOfEachStockSharesRangeMin": 100000,
      "amountOfEachStockSharesRangeMax": 1000000,
      "newAutoplayerAmountRangeMin": 2,
      "newAutoplayerAmountRangeMax": 10,
      "stockPerShareIssuePriceRangeMin": 50,
      "stockPerShareIssuePriceRangeMax": 200,
      "autoplayerInitialCashAmountRangeMin": 50000,
      "autoplayerInitialCashAmountRangeMax": 200000,
      "timeInterval": 5000
    }
    ```
    
- **Response**:**回复**：
    
    ```json
    {
      "message": "Simulation started"
    }
    ```
    

### **GET** `/api/stop`**获取**`/api/stop`

Stops the simulation.停止模拟。

- **Response**:**回复**：
    
    ```json
    {
      "message": "Simulation stopped"
    }
    ```
    

### **GET** `/api/data`**获取**`/api/data`

Retrieves the current simulation data.检索当前的模拟数据。

- **Response**:**回复**：
    
    ```json
    {
      "stocks": [
        {
          "id": 1,
          "name": "StockA",
          "currentPrice": 102.5,
          "priceHistory": [100, 101, 102.5]
        },
        ...
      ],
      "autoplayers": [
        {
          "id": 1,
          "name": "Player1",
          "cash": 95000,
          "portfolio": {
            "1": {
              "quantity": 50,
              "positions": [...]
            },
            ...
          }
        },
        ...
      ],
      "brokerage": {
        "holdings": {
          "1": 999950,
          "2": 499800,
          "3": 1997000
        }
      }
    }
    ```
    

### **POST** `/api/parameters`**POST** `/api/parameters`

(If implemented) Updates simulation parameters.（如果已实现）更新模拟参数。

---

## Error Handling错误处理

- **Invalid Parameters**: The backend validates user inputs and returns descriptive error messages if any required parameters are missing or invalid.**无效参数**：后端验证用户输入，如果任何必需的参数丢失或无效，则返回描述性错误消息。
- **Simulation State**: Attempts to start an already running simulation or stop a non-running simulation result in error responses.**模拟状态**：尝试启动已运行的模拟或停止未运行的模拟会导致错误响应。
- **Frontend Feedback**: Error messages from the backend are displayed to the user in the UI.**前端反馈**：来自后端的错误消息在 UI 中显示给用户。
- **Network Errors**: The frontend handles fetch errors and informs the user of connectivity issues.**网络错误**：前端处理获取错误并通知用户连接问题。

---

## Future Enhancements未来的增强功能

- **Data Visualization**: Enhance charts to display stock price movements and portfolio values over time with more interactive features.**数据可视化**：增强图表以通过更多交互功能显示股票价格变动和投资组合价值随时间的变化。
- **User Authentication**: Allow users to save and load simulation configurations.**用户身份验证**：允许用户保存和加载模拟配置。
- **Advanced Strategies**: Enable users to create custom strategies for autoplayers.**高级策略**：使用户能够为自动播放器创建自定义策略。
- **Persistent Storage**: Implement a database to store simulation data for analysis and historical reference.**持久存储**：实现数据库来存储模拟数据以供分析和历史参考。
- **Real-Time Updates**: Optimize data fetching and state management for smoother real-time updates.**实时更新**：优化数据获取和状态管理，实现更流畅的实时更新。

---

## Contributing贡献

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the existing style and includes appropriate documentation.欢迎贡献！请分叉存储库并提交包含更改的拉取请求。确保您的代码遵循现有风格并包含适当的文档。

---

## License执照

This project is licensed under the MIT License.该项目已获得 MIT 许可证的许可。

---

# Full Code

Below is the complete code for all files in the backend and frontend, incorporating all the requested features and updates, including the transition to React Router v6.下面是后端和前端所有文件的完整代码，包含所有请求的功能和更新，包括过渡到 React Router v6。