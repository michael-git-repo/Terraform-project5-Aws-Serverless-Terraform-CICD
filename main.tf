module "dynamodb" {
  source     = "./modules/dynamodb"
  table_name = "serverless-api-items"
}

module "lambda" {
  source               = "./modules/lambda"
  function_name        = "serverless-api-handler"
  dynamodb_table_name = module.dynamodb.table_name
  dynamodb_table_arn  = module.dynamodb.table_arn
}

module "api_gateway" {
  source               = "./modules/api_gateway"
  api_name             = "serverless-http-api"
  lambda_invoke_arn    = module.lambda.invoke_arn
  lambda_function_name = module.lambda.function_name
}