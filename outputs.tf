output "api_url" {
  value       = "${module.api_gateway.api_endpoint}/items"
  description = "URL endpoint to send POST requests"
}